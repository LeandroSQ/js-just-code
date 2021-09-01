async function fetchFaviconSvg() {
	// If already cached, ignore the request
	const cached = localStorage.getItem("svg-favicon");
	if (cached) return cached;

	// Fetch from the font awesome cdn
	const iconName = "code";
	const url = `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15/svgs/solid/${iconName}.svg`;

	// Fetch from the URL
	const response = await fetch(url);
	let svg = await response.text();
	svg = `data:image/svg+xml;base64,${btoa(svg)}`;

	// Save it on the local storage
	localStorage.setItem("svg-favicon", svg);

	return svg;
}

function removeAllFavIcons() {
	const elements = [...document.querySelectorAll("link[rel='shortcut icon']")];
	elements.forEach((x) => x.parentElement.removeChild(x));
}

function createFavicon() {
	const linkElement = document.createElement("link");
	linkElement.rel = "shortcut icon";
	linkElement.type = "image/x-icon";

	return linkElement;
}

function tintImage(source, color) {
	// Create the canvas element
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");

	// Set the canvas size to be equal as the source dimensions
	canvas.width = source.width;
	canvas.height = source.height;

	// Draws a solid rectangle of the provided color
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Set the composite operation to use the source image as an mask
	ctx.globalCompositeOperation = "destination-atop";

	// Draws the source image
	ctx.drawImage(source, 0, 0);

	return canvas;
}

function svgToImage(svg) {
	return new Promise((resolve, reject) => {
		const image = document.createElement("img");
		image.src = svg;
		image.onload = () => resolve(image);
		image.onerror = (e) => reject(e);
	});
}

export async function changeIconColor(color) {
	// Remove the previous
	removeAllFavIcons();

	// Creates the link element
	const linkElement = createFavicon();
	// Fetches the svg data
	const svg = await fetchFaviconSvg();
	const image = await svgToImage(svg);

	// Tints the image
	const tintedImage = tintImage(image, color);

	// Append it to the document head
	linkElement.href = tintedImage.toDataURL();
	document.head.appendChild(linkElement);
}
