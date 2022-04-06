const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';
const rootPath = path.resolve(__dirname);
console.log("dirname", __dirname)

const config = {
    entry: './src/app',
    output: {
        path: path.resolve(__dirname, '/dist'),
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
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        })
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
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

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        config.plugins.push(new MiniCssExtractPlugin());
        config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
    } else {
        config.mode = 'development';
    }
    return config;
};
