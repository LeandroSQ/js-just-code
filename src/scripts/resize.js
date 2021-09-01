const resizeElement = document.querySelector(".separator");
const editorContainerElement = document.querySelector(".container.editor");
const outputContainerElement = document.querySelector(".container.output");

resizeElement.draggable = false;

let isResizing = false;
let normalizedPosition = 0.7;

function updateLayoutSizing(relativeWidth) {
	// Fetch the window size
	const windowWidth = document.body.offsetWidth;
	const windowHeight = document.body.offsetHeight;

	// Set the normalized positions to the elements
	editorContainerElement.style.flex = relativeWidth;
	outputContainerElement.style.flex = 1 - relativeWidth;

	normalizedPosition = relativeWidth;

	// Update monaco editor
	window._instance.layout({
		width: windowWidth * relativeWidth - resizeElement.offsetWidth / 2,
		height: windowHeight
	});
}

function attachEventListeners() {
	window.addEventListener("resize", (e) => {
		updateLayoutSizing(normalizedPosition);
	});

	window.addEventListener("mouseup", (e) => {
		// Ignore mouse events if not resizing
		if (!isResizing) return;

		// Changes the resizing flag to ignore mouse events
		isResizing = false;

		// Changes the window cursor
		document.body.style.cursor = "inherit";
	});

	window.addEventListener("mousemove", (e) => {
		// Ignore mouse events if not resizing
		if (!isResizing) return;

		// Fetch the window size
		const windowWidth = document.body.offsetWidth;

		// Fetch the mouse horizontal position
		const mousePosition = e.x;

		// Calculate the horizontal relative position of the mouse
		const normalizedPosition = mousePosition / windowWidth;

		updateLayoutSizing(normalizedPosition);

		// Stores the layout horizontal distribution
		localStorage.setItem("layout-sizing", normalizedPosition.toString());
	});

	resizeElement.addEventListener("mousedown", (e) => {
		// Changes the resizing flag to handle mouse events
		isResizing = true;

		// Changes the window cursor
		document.body.style.cursor = "col-resize";
	});
}

function loadLayoutSizingFromLocalStorage() {
	// Load the horizontal layout from the local storage
	const layoutSizing = localStorage.getItem("layout-sizing");
	if (layoutSizing) updateLayoutSizing(parseFloat(layoutSizing));
}

window.addEventListener("load", (e) => {
	loadLayoutSizingFromLocalStorage();

	attachEventListeners();
});

export default {};