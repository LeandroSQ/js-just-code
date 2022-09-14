import Theme from "./theme.js";

const modal = document.getElementById("settingsModal");
const buttonOk = modal.querySelector("button");
const checkboxLightMode = modal.querySelector("input[name='settingLightMode']");
const selectEvaluatorType = modal.querySelector("select[name='settingEvaluator']");

buttonOk.addEventListener("click", hideSettingsModal);
checkboxLightMode.addEventListener("change", (e) => {
	settings.lightMode = checkboxLightMode.checked === true;

	// Define the theme to load based on preferences
	const theme = settings.lightMode ? "XCode" : "OneDarkPro";

	// Import the theme
	Theme.loadTheme(import(`./../themes/${theme}.json`), theme);

	saveSettings();
});
selectEvaluatorType.addEventListener("change", (e) => {
	settings.evaluatorMode = selectEvaluatorType.value;
	saveSettings();
});

export const settings = {
	lightMode: false,
	evaluatorMode: "sandbox"
};
loadSettings();

export function loadSettings() {
	let raw = localStorage.getItem("settings");
	if (raw) {
		raw = JSON.parse(raw);

		for (const property in raw) {
			if (!raw.hasOwnProperty(property)) continue;
			settings[property] = raw[property];
		}
	}

	checkboxLightMode.checked = settings.lightMode;
	selectEvaluatorType.value = settings.evaluatorMode;
}

export function saveSettings() {
	localStorage.setItem("settings", JSON.stringify(settings));
}

export function showSettingsModal() {
	modal.showModal();
	buttonOk.disabled = false;
}

export function hideSettingsModal() {
	buttonOk.disabled = true;
	modal.classList.add("hide");
	setTimeout(() => {
		buttonOk.disabled = false;
		modal.classList.remove("hide");
		modal.close();
	}, 500);
}
