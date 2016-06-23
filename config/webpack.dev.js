const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  output: {
    path: helpers.outputElectron('build'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    // 把它们提取成外部.css文件， 这样HtmlWebpackPlugin插件就会转而把一个<link>标签写进index.html了
    new ExtractTextPlugin('[name].css'),
    //拷贝electron文件到发布目录
    new CopyWebpackPlugin([
      { from: helpers.rootElectron('electron.js'), to: 'electron.js' },
      { from: helpers.rootElectron('package.json'), to: 'package.json' },
      { from: helpers.rootElectron('loading.gif'), to: 'loading.gif' },
      { from: helpers.rootElectron('favicon.ico'), to: 'icon.ico' }
    ])
  ]
});
