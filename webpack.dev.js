const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');


module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    app: './src/app',
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.min.js',
    publicPath: '/',
  },
  devServer: {
    static: path.join(__dirname, '/dist'),
    allowedHosts: [
      'local.nypl.org',
    ],
    historyApiFallback: true
  },
});