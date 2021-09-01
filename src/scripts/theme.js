import * as Favicon from "./favicon.js";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";

const colours = { };

const BACKGROUND = "editor.background";
const FOREGROUND = "editor.foreground";
const ACCENT = "symbolIcon.methodForeground";
const ERROR = "editorError.foreground";
const WARNING = "editorWarning.foreground";

function mountRgbaColor({ r, g, b, a }) {
	return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function getColor(name, source=null) {
	let _source = source;
	if (!_source) _source = window._instance._themeService._theme.colors;

	if (_source instanceof Map) {
		return mountRgbaColor(_source.get(name).rgba);
	} else {
		return mountRgbaColor(_source[name].rgba);
	}
}

function setColorVariable({ name, value }) {
	// Set as a CSS ::root variable
	document.documentElement.style.setProperty(`--${name}`, value);

	// Map it to the dictionary
	colours[name] = value;
}

function onThemeLoaded() {
	setColorVariable({
		name: "background",
		value: getColor(BACKGROUND)
	});

	setColorVariable({
		name: "foreground",
		value: getColor(FOREGROUND)
	});

	setColorVariable({
		name: "accent",
		value: getColor(ACCENT, window._instance._themeService._theme.defaultColors)
	});

	// Changes the favicon dynamically
	Favicon.changeIconColor(colours["accent"]);

	setColorVariable({
		name: "error",
		value: getColor(ERROR)
	});

	setColorVariable({
		name: "warning",
		value: getColor(WARNING)
	});
}

export default {
	loadTheme: async function(themePromise, name) {
		// Loads the theme data
		const themeData = await themePromise;

		// Set the theme onto the editor
		monaco.editor.defineTheme(name, themeData);
		monaco.editor.setTheme(name);

		onThemeLoaded();
	},
	getColor(name) {
		if (name in colours) return colours[name];
		else return name;
	}
};