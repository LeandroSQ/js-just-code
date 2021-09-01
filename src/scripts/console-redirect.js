import Theme from "./theme.js";

// Fetch the output element
const outputElement = document.querySelector("#output");
const INSERTION_THRESHOLD = 100;
let logCount = 0;
let lastInsertion = 0;
let fragment = null;
let timeoutHandle = null;

function createLogElement(text, color) {
	const element = document.createElement("pre");
	element.classList.add("log-item");
	element.style.color = color;
	element.innerText = text;
	if (logCount % 2 !== 0) element.classList.add("odd");

	// Increment the log item count
	logCount ++;

	return element;
}

function lazyAppendDocumentFragment() {
	const elapsedSinceLastInsertion = performance.now() - lastInsertion;
	if (elapsedSinceLastInsertion > INSERTION_THRESHOLD && fragment) {
		outputElement.appendChild(fragment);
		fragment = null;
	}
}

export function log(text, color=null) {
	const _color = Theme.getColor(color || "foreground");
	const element = createLogElement(text, _color);

	// Calculate the last time between an insertion
	const elapsedSinceLastInsertion = performance.now() - lastInsertion;
	if (elapsedSinceLastInsertion > INSERTION_THRESHOLD) {
		// If enough passed to insert directly on the DOM, do it
		outputElement.appendChild(element);
		lastInsertion = performance.now();
	} else {
		// If too many logs were to be appended on the DOM, first virtually append them into a document fragment
		// This increases the performance drastically
		if (!fragment) fragment = document.createDocumentFragment();

		fragment.appendChild(element);
		lastInsertion = performance.now();

		// Schedule to lazy append them
		if (!timeoutHandle) clearTimeout(timeoutHandle);
		timeoutHandle = setTimeout(lazyAppendDocumentFragment, INSERTION_THRESHOLD);
	}

}

function redirect(color, ...args) {
	for (const argument of args) {
		if (typeof argument === "object") {
			log(JSON.stringify(argument), color);
		} else {
			log(argument.toString(), color);
		}
	}
}

export function clear() {
	outputElement.innerHTML = "";
	logCount = 0;
}

export function attachToContext(context) {
	context["console"] = {
		log: redirect.bind(null),
		error: redirect.bind(null, Theme.getColor("error")),
		warn: redirect.bind(null, Theme.getColor("warning")),
		info: redirect.bind(null),
		dir: redirect.bind(null),
		debug: redirect.bind(null)
	};
}