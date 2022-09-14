import "./extensions.js";
import("./../styles/style.css");
import("./resize.js");
import * as ConsoleRedirect from "./console-redirect.js";
import * as Evaluator from "./evaluator.js";
import Theme from "./theme.js";
import * as Settings from "./settings.js";

async function onRunCode() {
	// Fetch the source code from the monaco editor
	const sourceCode = window._instance.getValue();

	// Defines the context on which the script will run
	const variables = { };

	// Clears the output panel
	ConsoleRedirect.clear();

	let promise = null;

	// Evaluates the code
	if (Settings.settings.evaluatorMode == "worker") {
		promise = Evaluator.runInWorker({ code: sourceCode, context: variables });
	} else {
		promise = Evaluator.runInSandbox({ code: sourceCode, context: variables });
	}

	promise.then(
		(result) => {
			if (result) {
				ConsoleRedirect.log("-- Program exited, output: ");
				ConsoleRedirect.log(result);
			}
		},
		(error) => {
			ConsoleRedirect.log("stack" in error ? error.stack : error, Theme.getColor("error"));
		}
	);
}

window.runCode = (e) => onRunCode();
window.addLoadEventListener(async (e) => {
	await import("@fortawesome/fontawesome-free/js/fontawesome");
	await import("@fortawesome/fontawesome-free/js/solid");
	// import("@fortawesome/fontawesome-free/js/regular");
	// import("@fortawesome/fontawesome-free/js/brands");

	document.body.classList.add("loaded");
	await import("./editor.js");
});