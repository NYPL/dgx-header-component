const path = require('path');
const webpack = require('webpack');
const cleanBuild = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const rootPath = path.resolve(__dirname);

if (process.env.NODE_ENV !== 'development') {
  const loaders = [
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
      },
    },
  ];
  module.exports = {
    devtool: 'source-map',
    entry: {
      app: [
        path.resolve(rootPath, './src/components/Header/Header.js'),
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.scss'],
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'index.min.js',
      libraryTarget: 'umd',
      library: 'dgxHeaderComponent',
    },
    externals: {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
      underscore: {
        root: 'underscore',
        commonjs2: 'underscore',
        commonjs: 'underscore',
        amd: 'underscore',
      },
      'dgx-react-ga': {
        root: 'dgx-react-ga',
        commonjs2: 'dgx-react-ga',
        commonjs: 'dgx-react-ga',
        amd: 'dgx-react-ga',
      }
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          use: 'babel-loader',
        },
        {
          test: /\.scss$/,
          include: path.resolve(rootPath, 'src'),
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: loaders,
          }),
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin('main.scss'),
      new cleanBuild(['dist']),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
    ],
  };
} else {
  module.exports = {
    devtool: 'eval',
    entry: {
      app: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/app.js',
      ],
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'index.min.js',
      publicPath: '/',
    },
    plugins: [
      new cleanBuild(['dist']),
      new ExtractTextPlugin('main.scss'),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        loadA11y: process.env.loadA11y || false,
        nodeEnv: JSON.stringify('development'),
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.scss'],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          use: 'babel-loader',
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
          include: path.resolve(rootPath, 'src'),
        },
      ],
    },
  };
}
