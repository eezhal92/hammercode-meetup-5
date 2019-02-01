const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV || 'development'
const mode = NODE_ENV === 'development' ? 'development' : 'production'

module.exports = {
  entry: './src/index.js',

  mode,

  devtool: NODE_ENV === 'development' ? 'inline-source-map' : 'source-map',

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'main.js',
  },

  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
    ],
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    historyApiFallback: true,
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'${NODE_ENV}'`
      },
    }),

    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true,
      chunksSortMode: 'dependency'
    }),

    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'static'),
        to: 'static',
        ignore: ['.*']
      },
    ]),
  ],
}
