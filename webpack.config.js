const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const srcDir   = path.resolve(__dirname, 'src', 'client')
const buildDir = path.resolve(__dirname, 'dist')

module.exports = {
  entry: [path.join(srcDir, 'index.tsx')],
  output: {
    path:     buildDir,
    filename: '/bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js']
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: path.join(srcDir, 'style.css')
    }]),
    new HtmlWebpackPlugin({
      template: path.join(srcDir, 'index.html')
    })
  ],
  module: {
    loaders: [{
      test:    /\.tsx?$/,
      loader:  'babel-loader!ts-loader',
      exclude: /node_modules/
    }],
    preLoaders: [{
      test:    /\.js$/,
      loader:  'source-map-loader',
      exclude: /node_modules/
    }]
  }
}
