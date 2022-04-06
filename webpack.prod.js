const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const rootPath = path.resolve(__dirname);

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
    app: 
      path.resolve(rootPath, './src/components/Header/Header.js'),
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.min.js',
    libraryTarget: 'umd',
    globalObject: 'this',
    library: 'dgxHeaderComponent',
  },
});