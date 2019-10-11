const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const host = '192.168.5.51'

module.exports = merge(common, {
  mode: 'development',
  entry: {
    app: './src/index.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    public: 'http://' + host + ':8083',
    host: host,
    port: '8083',
    publicPath: '/',
    hot: true,
    proxy: {
      '/test': {
        target: 'http://127.0.0.1:3000'
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      { from: 'static/js/*' },
      { from: 'static/css/*' },
      { from: 'static/font/*' },
      { from: 'static/imgs/*' }
    ])
  ]
});
