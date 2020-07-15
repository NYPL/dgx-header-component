const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rootPath = path.resolve(__dirname);

if (process.env.NODE_ENV !== 'development') {
  const appEnv = process.env.APP_ENV ? process.env.APP_ENV : 'production';
  module.exports = {
    mode: 'production',
    // devtool: 'source-map',
    entry: {
      app: [
        path.resolve(rootPath, './src/components/Header/Header.js'),
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.scss'],
    },
    output: {
      path: path.join(__dirname, '/dist'),
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
      },
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: 'main.scss' }),
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
          appEnv: JSON.stringify(appEnv),
        },
      }),
    ],
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
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
          ],
        },
      ],
    }
  };
} else {
  const appEnv = process.env.APP_ENV ? process.env.APP_ENV : 'development';
  module.exports = {
    mode: 'development',
    devtool: 'inline-source-maps',
    entry: {
      app: ['./src/app.js'],
    },
    output: {
      path: path.resolve(__dirname, '/dist'),
      filename: 'index.min.js',
      publicPath: 'http://localhost:3000',
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        nodeEnv: JSON.stringify('development'),
        appEnv: JSON.stringify(appEnv),
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.scss'],
    },
    // We need this to test for cookies and signing in.
    devServer: {
      allowedHosts: [
        'local.nypl.org'
      ]
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          }
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
