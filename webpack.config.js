var path = require('path');
var webpack = require('webpack');
var cleanBuild = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var rootPath = path.resolve(__dirname);

if (process.env.NODE_ENV !== 'development') {
  module.exports = {
    devtool: 'source-map',
    entry: [
      'babel-polyfill',
      path.resolve(rootPath,'./src/components/Header/Header.js')
    ],
    resolve: {
      extensions: ['', '.js', '.jsx', '.scss']
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'index.min.js',
      libraryTarget: 'umd',
      library: 'dgxHeaderComponent'
    },
    externals: {
      'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loaders: ['babel'],
          query: {
            presets: ['es2015', 'react']
          },
        },
        {
          test: /\.scss$/,
          include: path.resolve(rootPath, 'src'),
          loader: ExtractTextPlugin.extract(
            // activate source maps via loader query
            'css?sourceMap!' +
            'sass?sourceMap'
          )
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('main.scss'),
      new cleanBuild(['dist'])
      // new webpack.optimize.UglifyJsPlugin({
      //   output: {
      //     comments: false
      //   },
      //   compress: {
      //     warnings: true
      //   }
      // })
    ]
  };
} else {
  module.exports = {
    devtool: 'eval',
    entry: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      'babel-polyfill',
      './src/app.js'
    ],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'index.min.js',
      publicPath: '/'
    },
    plugins: [
      new cleanBuild(['dist']),
      new ExtractTextPlugin('main.scss'),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        loadA11y: process.env.loadA11y || false,
      }),
    ],
    resolve: {
      extensions: ['', '.js', '.jsx', '.scss']
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: ['babel'],
          query: {
            presets: ['react', 'es2015']
          }
        },
        {
          test: /\.scss$/,
          loader: 'style!css!sass',
          include: path.resolve(rootPath, 'src')
        }
      ]
    }
  };
}
