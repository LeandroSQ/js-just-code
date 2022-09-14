// (1) Desired editor features:
// BEGIN_FEATURES
import "monaco-editor/esm/vs/editor/browser/controller/coreCommands.js";
import "monaco-editor/esm/vs/editor/browser/widget/codeEditorWidget.js";
// import "monaco-editor/esm/vs/editor/browser/widget/diffEditorWidget.js";
// import "monaco-editor/esm/vs/editor/browser/widget/diffNavigator.js";
import "monaco-editor/esm/vs/editor/contrib/anchorSelect/anchorSelect.js";
import "monaco-editor/esm/vs/editor/contrib/bracketMatching/bracketMatching.js";
import "monaco-editor/esm/vs/editor/contrib/caretOperations/caretOperations.js";
import "monaco-editor/esm/vs/editor/contrib/caretOperations/transpose.js";
import "monaco-editor/esm/vs/editor/contrib/clipboard/clipboard.js";
import "monaco-editor/esm/vs/editor/contrib/codeAction/codeActionContributions.js";
// import "monaco-editor/esm/vs/editor/contrib/codelens/codelensController.js";
// import "monaco-editor/esm/vs/editor/contrib/colorPicker/colorContributions.js";
import "monaco-editor/esm/vs/editor/contrib/comment/comment.js";
// import "monaco-editor/esm/vs/editor/contrib/contextmenu/contextmenu.js";
import "monaco-editor/esm/vs/editor/contrib/cursorUndo/cursorUndo.js";
// import "monaco-editor/esm/vs/editor/contrib/dnd/dnd.js";
// import "monaco-editor/esm/vs/editor/contrib/documentSymbols/documentSymbols.js";
import "monaco-editor/esm/vs/editor/contrib/find/findController.js";
import "monaco-editor/esm/vs/editor/contrib/folding/folding.js";
import "monaco-editor/esm/vs/editor/contrib/fontZoom/fontZoom.js";
import "monaco-editor/esm/vs/editor/contrib/format/formatActions.js";
// import "monaco-editor/esm/vs/editor/contrib/gotoError/gotoError.js";
// import "monaco-editor/esm/vs/editor/contrib/gotoSymbol/goToCommands.js";
// import "monaco-editor/esm/vs/editor/contrib/gotoSymbol/link/goToDefinitionAtPosition.js";
import "monaco-editor/esm/vs/editor/contrib/hover/hover.js";
import "monaco-editor/esm/vs/editor/contrib/inPlaceReplace/inPlaceReplace.js";
import "monaco-editor/esm/vs/editor/contrib/indentation/indentation.js";
import "monaco-editor/esm/vs/editor/contrib/inlineHints/inlineHintsController.js";
import "monaco-editor/esm/vs/editor/contrib/linesOperations/linesOperations.js";
import "monaco-editor/esm/vs/editor/contrib/linkedEditing/linkedEditing.js";
import "monaco-editor/esm/vs/editor/contrib/links/links.js";
import "monaco-editor/esm/vs/editor/contrib/multicursor/multicursor.js";
import "monaco-editor/esm/vs/editor/contrib/parameterHints/parameterHints.js";
import "monaco-editor/esm/vs/editor/contrib/rename/rename.js";
import "monaco-editor/esm/vs/editor/contrib/smartSelect/smartSelect.js";
// import "monaco-editor/esm/vs/editor/contrib/snippet/snippetController2.js";
import "monaco-editor/esm/vs/editor/contrib/suggest/suggestController.js";
// import "monaco-editor/esm/vs/editor/contrib/toggleTabFocusMode/toggleTabFocusMode.js";
import "monaco-editor/esm/vs/editor/contrib/unusualLineTerminators/unusualLineTerminators.js";
// import "monaco-editor/esm/vs/editor/contrib/viewportSemanticTokens/viewportSemanticTokens.js";
import "monaco-editor/esm/vs/editor/contrib/wordHighlighter/wordHighlighter.js";
import "monaco-editor/esm/vs/editor/contrib/wordOperations/wordOperations.js";
import "monaco-editor/esm/vs/editor/contrib/wordPartOperations/wordPartOperations.js";
// import "monaco-editor/esm/vs/editor/standalone/browser/accessibilityHelp/accessibilityHelp.js";
// import "monaco-editor/esm/vs/editor/standalone/browser/iPadShowKeyboard/iPadShowKeyboard.js";
// import "monaco-editor/esm/vs/editor/standalone/browser/inspectTokens/inspectTokens.js";
// import "monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneCommandsQuickAccess.js";
// import "monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneGotoLineQuickAccess.js";
// import "monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneGotoSymbolQuickAccess.js";
// import "monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneHelpQuickAccess.js";
// import "monaco-editor/esm/vs/editor/standalone/browser/referenceSearch/standaloneReferenceSearch.js";
// import "monaco-editor/esm/vs/editor/standalone/browser/toggleHighContrast/toggleHighContrast.js";
// END_FEATURES
import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";

// (2) Desired languages:
import "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution.js";
import "monaco-editor/esm/vs/language/typescript/monaco.contribution.js";
import Theme from "./theme.js";
import * as Settings from "./settings.js";

self.MonacoEnvironment = {
	getWorkerUrl: function(a, b) {
		return "./ts.worker.bundle.js";
	}
};

function setup() {
	const editorElement = document.getElementById("editor");
	const initialCode = `function measure(callback) {
	let start = performance.now();
	callback();
	let end = performance.now();
	let elapsed = end - start;
	console.log(\`Elapsed: \${elapsed}ms\`);
}

measure(() => {
	let buffer = [ ];
	for (let j = 0; j < 1000; j++) {
		for (let i = 0; i < 10000; i++) {
			buffer.push(Math.sqrt(i));
		}
	}
});`;

	window._instance = monaco.editor.create(editorElement, {
		value: initialCode,
		roundedSelection: true,
		fontSize: "14pt",
		tabSize: 4,
		useTabStops: true,
		insertSpaces: false,
		wordWrapMinified: true,
		showFoldingControls: "always",
		automaticLayout: false,
		wrappingIndent: "indent",
		padding: {
			top: 10,
			bottom: 10
		},
		minimap: {
			enabled: false
		},
		language: "javascript"
	});

	monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
		noSemanticValidation: true,
		noSyntaxValidation: false
	});

	monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
		target: monaco.languages.typescript.ScriptTarget.ES6,
		allowNonTsExtensions: true
	});

	window._monaco = monaco.editor;

	redefineBindings();

	// Define the theme to load based on preferences
	const theme = Settings.settings.lightMode ? "XCode" : "OneDarkPro";

	// Import the theme
	Theme.loadTheme(import(`./../themes/${theme}.json`), theme);
}

function redefineBindings() {
	// IntelliJ move lines binding
	removeKeyBinding("editor.action.copyLinesDownAction");
	removeKeyBinding("editor.action.copyLinesUpAction");
	addKeyBinding("editor.action.moveLinesDownAction", monaco.KeyMod.Alt | monaco.KeyMod.Shift | monaco.KeyCode.DownArrow);
	addKeyBinding("editor.action.moveLinesUpAction", monaco.KeyMod.Alt | monaco.KeyMod.Shift | monaco.KeyCode.UpArrow);

	// Global folding and unfolding
	addKeyBinding("editor.foldAll", monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.US_MINUS);
	addKeyBinding("editor.unfoldAll", monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.US_EQUAL);

	// Symbol rename
	addKeyBinding("editor.action.rename", monaco.KeyMod.Shift | monaco.KeyCode.F6);
}

function removeKeyBinding(id) {
	window._instance._standaloneKeybindingService.addDynamicKeybinding(`-${id}`, null, () => {});
}

function addKeyBinding(id, keys) {
	const action = window._instance.getAction(id);
	window._instance._standaloneKeybindingService.addDynamicKeybinding(id, keys, () => action.run());
}

setup();

export default { };