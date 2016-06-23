const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//定义全局开发环境 development production
const ENV = process.env.NODE_ENV = process.env.ENV = 'development';
const commConfig = {
	//参考http://webpack.github.io/docs/configuration.html#target
	//target:'node-webkit',
	//入口文件,这些文件
	entry : {
		//angular组件及第三方库
		//'electron': './electron-index',
		//angular2运行必须的polyfills
		'polyfills': './src/polyfills.ts',
		//angular组件及第三方库
		'vendor': './src/vendor',
		//主文件js
		'main': './src/app/main'
	},
	//输出文件
	output : {
		path: __dirname + '/build/'
	},
	resolve : {
		// Add `.ts` and `.tsx` as a resolvable extension.
		extensions : ['','.ts','.js']
	},
	module : {
		loaders : [
			// all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
			{
				test : /\.ts$/,
				loader : 'ts-loader'
			},
			{
				test: /\.css$/,
				loader: 'raw-loader'
			},
			{
				test: /\.html$/,
				loader: 'raw-loader',
				exclude: ['./src/index.html']
			}
		]
	},
	plugins : [
		//提取多个入口文件的公共脚本部分，然后生成一个 common.js 来方便多页面之间进行复用
		new webpack.optimize.CommonsChunkPlugin({
			name:['main','vendor','polyfills']
		}),
		//在src/index.html中添加output生成的js文件
		new HtmlWebpackPlugin({
			template: './src/index.html',
			//chunks: ['vendor','main']
		})
	]
}
// 开发环境
const devConfig = {
	//为js文件生成sourcemap便于调试，生产环境下不包含此项
	devtool:'source-map',
	output : {
		filename: '[name].bundle.js',
		sourceMapFilename: '[name].bundle.map',
		//在entry中没有列出的文件如果被引用到则按下面规则生成
		chunkFilename: '[id].chunk.js'
	}
}
// 生产环境
const prodConfig = {
	output : {
		filename: '[name].[hash].bundle.js',
		sourceMapFilename: '[name].[hash].bundle.map',
		//在entry中没有列出的文件如果被引用到则按下面规则生成
		chunkFilename: '[id].[chunkhash].chunk.js'
	},
	plugins:[
		//压缩文件
		new CompressionPlugin({
			regExp : /\.css$|\.html$|\.js$|\.map$/,
			threshold : 2 * 1024
		}),
		//最小化并混淆js文件
		new webpack.optimize.UglifyJsPlugin({
			//对输出代码不做美化
			beautify : false,
			//最小化后不包含注释
			comments : false
		})
	]
}
module.exports = ENV=='development' && webpackMerge(commConfig,devConfig)||webpackMerge(commConfig,prodConfig);