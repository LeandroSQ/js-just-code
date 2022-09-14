const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	mode: "development",
	entry: {
		"app": "./src/scripts/index.js",
		"ts.worker": "monaco-editor/esm/vs/language/typescript/ts.worker",
	},
	output: {
		globalObject: "self",
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist")
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.ttf$/,
				use: ["file-loader"]
			}
		]
	},
	devServer: {
		contentBase: ["./src"], // both src and output dirs
		inline: true,
		compress: true,
		port: 3000,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "src/index.html"
		}),
		new CopyPlugin({
			patterns: [
				{
					context: path.resolve(__dirname, "src"),
					from: "./**/*.json",
				}
			],
		}),
		new webpack.IgnorePlugin({
			resourceRegExp: /^((fs)|(path)|(os)|(crypto)|(source-map-support))$/,
			contextRegExp: /vs(\/|\\)language(\/|\\)typescript(\/|\\)lib/
		}),
		new webpack.ContextReplacementPlugin(
			/monaco-editor(\\|\/)esm(\\|\/)vs(\\|\/)editor(\\|\/)common(\\|\/)services/
		)
	],
	optimization: {
		concatenateModules: true,
		minimize: false,
		minimizer: [
		]
	}
};
