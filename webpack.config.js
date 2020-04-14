let path = require('path');
let ExtractTextPlugin = require("extract-text-webpack-plugin");

let conf = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'main.js',
		publicPath: 'dist/'
	},
	devServer: {
		overlay: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				options: {
					presets: [
						[
							"@babel/preset-env",
							{
								"useBuiltIns": "entry"
							}
						]
					]
				}
				// exclude: '/node_modules',
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
          			//fallback: "style-loader",
          			use: "css-loader"
        		})
				// use: [
				// 	'style-loader',
				// 	'css-loader',
				// ]
			}
		]
	},
	plugins: [
    	new ExtractTextPlugin("styles.css"),
  	]
};

module.exports = (env, options) => {
	let production = options.mode === 'production';

	conf.devtool = production
					? false //sourse-map  -for showin code others
					: 'eval-soursemap';

	return conf;
}