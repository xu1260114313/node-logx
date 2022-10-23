const path = require('path');

module.exports = {
	entry: './src/main.js',
	target: 'node',
	plugins: [],
	externals: [],
	node: {
		__filename: false,
		__dirname: false
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		// clean: true, //开启以后每次构建都会清空dist
		libraryTarget: 'commonjs2',
		devtoolModuleFilenameTemplate: '../[resource-path]'
	}
}