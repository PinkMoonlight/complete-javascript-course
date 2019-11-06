const path = require('path'); // build in node module called path
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill','./src/js/index.js'],
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/bundle.js'
  },
  devServer: {
      contentBase: './dist'
  },
  plugins: [
      new HtmlWebpackPlugin({  //injects script into new html file in dist
          filename: 'index.html',
          template: './src/index.html' //starting file
      })
  ],
  module: { //loaders
      rules: [
          {
              test: /\.js$/, //tests for file ending in .js
              exclude: /node_modules/,
              use: {
                  loader: 'babel-loader'
              }
          }
      ]
  }
};