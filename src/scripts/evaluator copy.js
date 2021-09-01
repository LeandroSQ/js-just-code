import * as ConsoleRedirect from "./console-redirect.js";

export default class Evaluator {

	constructor() {
		this.activeSandboxes = [];
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

	async run({ code, context }) {
		const sandbox = this.#createSandbox(context);

		return await sandbox.evaluate(code);
	}

}