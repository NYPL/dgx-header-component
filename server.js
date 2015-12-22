var webpack = require('webpack'),
  WebpackDevServer = require('webpack-dev-server'),
  config = require('./webpack.config'),
  pkg = require('./package.json');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  stats: false,
  inline: true,
  historyApiFallback: true
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('Currently building: ' + pkg.name);
  console.log('Webpack Development Server listening at localhost:3000');
});
