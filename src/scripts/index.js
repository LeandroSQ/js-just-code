import("./../styles/style.css");
import("./editor.js");
import("@fortawesome/fontawesome-free/js/fontawesome");
import("@fortawesome/fontawesome-free/js/solid");
import("@fortawesome/fontawesome-free/js/regular");
import("@fortawesome/fontawesome-free/js/brands");
import("./resize.js");
import * as ConsoleRedirect from "./console-redirect.js";
import * as Evaluator from "./evaluator.js";
import Theme from "./theme.js";

async function onRunCode() {
	// Fetch the source code from the monaco editor
	const sourceCode = window._instance.getValue();

	// Defines the context on which the script will run
	const variables = { };

	// Clears the output panel
	ConsoleRedirect.clear();

	// Evaluates the code
	Evaluator.runInWorker({ code: sourceCode, context: variables })
			 .then((result) => {
				 if (result) {
					 ConsoleRedirect.log("-- Program exited, output: ");
					 ConsoleRedirect.log(result);
				 }
			 })
			 .catch((error) => {
				 ConsoleRedirect.log("stack" in error ? error.stack : error, Theme.getColor("error"));
			 });
}

window.runCode = (e) => onRunCode();
window.addEventListener("load", (e) => {
	document.body.classList.add("loaded");
});