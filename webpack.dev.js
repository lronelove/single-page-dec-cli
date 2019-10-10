const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const host = '192.168.5.25'

module.exports = merge(common, {
  mode: 'development',
  entry: {
    app: './src/index.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    public: 'http://' + host + ':8083' + '/?redirectUrl=/static/portal/index.do',
    host: host,
    port: '8083',
    publicPath: '/',
    hot: true,
    proxy: {
      '/': {
        target: 'http://192.168.1.10080:10022',
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      { from: 'static/resources/js/base/*' },
      { from: 'static/resources/themes/css/*' },
      { from: 'static/resources/themes/font/*' },
      { from: 'static/resources/themes/imgs/*' },
      { from: 'static/resources/themes/js/*' }
    ])
  ]
});
