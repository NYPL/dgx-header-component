const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const pkg = require('./package.json');

const server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  stats: false,
  inline: true,
  historyApiFallback: true,
});

server.listen(3000, 'localhost', (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Currently building: ' + pkg.name);
  console.log('Webpack Development Server listening at localhost:3000');
});
