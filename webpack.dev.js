const merge = require('webpack-merge')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const common = require('./webpack.config.js')

const host = '192.168.21.202'

// 多页面配置(可以在这里配置多个页面)
const multiplePagesConfig = [
	{
		filename: 'index.html',
		template: './index.html'
	},
	{
		filename: 'login.html',
		template: './login.html'
	}
]

// 根据多页面配置生成HtmlWebpackPlugin配置
function generatePluginConfig () {
	return multiplePagesConfig.map(item => {
		return new HtmlWebpackPlugin({
			// 生成出来的html文件名
			filename: item.filename,
			// 每个html的模版，这里多个页面使用同一个模版
			template: item.template,
			// 自动将引用插入html
			inject: true
		})
	})
}

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
    ]),
	  ...generatePluginConfig() // 根据多页面配置生成HtmlWebpackPlugin配置
  ]
});
