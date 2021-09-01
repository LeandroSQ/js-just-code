import * as ConsoleRedirect from "./console-redirect.js";

export default class Evaluator {

	constructor() {
		this.activeSandboxes = [];
		this.activeWorkers = [];
	}

	#onIframeEvaluate(iframe, context, code) {
		return new Promise(async (resolve, reject) => {
			try {
				// Adds the sandbox to the list
				this.activeSandboxes.push(iframe);

				// Evaluates the code
				let result = iframe.contentWindow.eval(code);
				if (result instanceof Promise) result = await result;

				// Schedule to remove the iframe from the page
				setTimeout(() => {
					// Removes the sandbox from the list
					this.activeSandboxes.splice(this.activeSandboxes.indexOf(iframe), 1);

					// Removes the iframe from the document body
					document.body.removeChild(iframe);
				}, 250);

				resolve(result);
			} catch (error) {
				console.error(error);

				reject(error);
			}
		});
	}

	#createSandbox(context) {
		// Creates the iframe
		const iframe = document.createElement("iframe");
		iframe.style.display = "none";

		// Appends the iframe to the document body
		document.body.appendChild(iframe);

		// Context fallback
		let _context = context;
		if (!_context) _context = { };

		// Attach the console redirect functions to the context
		ConsoleRedirect.attachToContext(_context);

		// Set every entry on the context to the iframe
		for (const property in _context) {
			if (context.hasOwnProperty(property)) {
				iframe.contentWindow[property] = context[property];
			}
		}

		// Helper function to evaluate code
		iframe.evaluate = this.#onIframeEvaluate.bind(this, iframe, context);

		return iframe;
	}

	#onWorkerSetup() {
		function handleArgument(arg) {
			if (arg instanceof Error) return arg.stack || arg.message;
			if (typeof arg === "object") return JSON.stringify(arg);

			return arg.toString();
		}

		function redirect(type, ...args) {
			self.postMessage({
				event: "log",
				type,
				text: args.map((x) => handleArgument(x).replaceAll(new RegExp(self.name, "g"), "(sandbox)")).join(" ")
			});
		}

		self.console = {
			log: redirect.bind(null, "log"),
			info: console.log,// redirect.bind(null, "log"),
			dir: redirect.bind(null, "log"),
			debug: redirect.bind(null, "log"),
			error: redirect.bind(null, "error"),
			warn: redirect.bind(null, "warn"),
		};
	}

	#onWorkerMessage(e) {
		// Listens for any incoming log
		if (e && e.data && e.data.event === "log") {
			switch (e.data.type) {
				case "log":
					ConsoleRedirect.log(e.data.text);
					break;

				case "error":
					ConsoleRedirect.log(e.data.text, "error");
					break;

				case "warn":
				case "warning":
					ConsoleRedirect.log(e.data.text, "warning");
					break;
			}
		}
	}

	#onWorkerError(e) {
		let message = "Unknown error!";
		if (e && e.stack) message = e.stack;
		else if (e && e.message) message = e.message;
		else if (e && typeof e === "string") message = e;

		ConsoleRedirect.log(message, "error");
	}

	killWorkers() {
		this.activeWorkers.forEach((x) => x.terminate());
		this.activeWorkers = [];
	}

	async run({ code, context }) {
		// Terminates all the active workers, 'cos having more than 13 active on the page may cause the page to crash
		this.killWorkers();

		// Inject this.#onWorkerSetup() function into the worker's source
		const injectedCode = this.#onWorkerSetup.toString().replace(this.#onWorkerSetup.name, "function");
		const workerSource = /* javascript */`"use strict";
			(${injectedCode})();
			(async function(){
				${code}
			})().then(x => {}).catch(e => console.error(e));`;

		// Convert the worker source into a Blob
		const blob = new Blob([workerSource], { type: "application/javascript" });
		const blobUrl = URL.createObjectURL(blob);

		// Creates the Worker with the created blob
		const worker = new Worker(blobUrl, { name: blobUrl });
		this.activeWorkers.push(worker);

		// Define the worker message handler
		worker.onmessage = this.#onWorkerMessage.bind(this);
		worker.onerror = worker.onunhandledrejection = this.#onWorkerError.bind(this);
	}

}