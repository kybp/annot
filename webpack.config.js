const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [path.resolve('src', 'client', 'index.tsx')],
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('src', 'client', 'index.html')
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
