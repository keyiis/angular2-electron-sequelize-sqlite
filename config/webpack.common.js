const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');
module.exports = {
  entry: {
    'polyfills': helpers.rootAngular('polyfills.ts'),
    'vendor': helpers.rootAngular('vendor.ts'),
    'app': helpers.rootAngular('app/main.ts')
  },

  resolve: {
    extensions: ['', '.js', '.ts']
  },

  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts'},
      { test: /\.json$/, loader: 'json' },
      { test: /\.html$/, loader: 'html' },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      // 处理应用级的css文件,控制全局样式，需要在html中引入的
      {
        test: /\.css$/,
        exclude: helpers.rootAngular('app'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      },
      // 处理组件中styleUrls属性来指定的css样式
      {
        test: /\.css$/,
        include: helpers.rootAngular('app'),
        loader: 'raw'
      }
    ]
  },
  // externals: { "bundle!sequelize": "sequelize" },
  externals: {
    "sequelize":"require('sequelize')"
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: helpers.rootAngular('index.html')
    })
  ]
};
