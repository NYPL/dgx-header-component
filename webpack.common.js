const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      title: 'Production',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),

  },
  module: {
    rules: [
        {
            test: /\.(js|jsx)$/i,
            loader: 'babel-loader',
        },
        {
            test: /\.s[ac]ss$/i,
            use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
            test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
            type: 'asset',
        },
    ],
  }, 
};