const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const JsonMinimizerPlugin = require("json-minimizer-webpack-plugin");

module.exports = {
	mode: "production",
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
		port: 9000,
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
		new webpack.IgnorePlugin(
			/^((fs)|(path)|(os)|(crypto)|(source-map-support))$/,
			/vs(\/|\\)language(\/|\\)typescript(\/|\\)lib/
		),
		new webpack.ContextReplacementPlugin(
			/monaco-editor(\\|\/)esm(\\|\/)vs(\\|\/)editor(\\|\/)common(\\|\/)services/
		)
	],
	optimization: {
		concatenateModules: true,
		minimize: true,
		minimizer: [
			/* new TerserPlugin({
				terserOptions: {
					sourceMap: true
				}
			}), */

			new JsonMinimizerPlugin()
		],
		runtimeChunk: "single",
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "all",
				},
			},
		},
	}
};
