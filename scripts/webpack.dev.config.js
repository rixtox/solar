import path from 'path';
import fs from 'fs.extra';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import * as config from '../config';
import webpack_config from './webpack.config';
import callback from './utils/webpack-callback';

webpack_config.output.path = path.resolve(config.path.output, 'dev-server');

webpack_config.entry.main = [
  ...webpack_config.entry.main,
  'webpack/hot/only-dev-server?/',
  'webpack-dev-server/client?/'
];

webpack_config.module.loaders = [
  ...webpack_config.module.loaders,
  {
    test: /\.scss$/i,
    loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap'
  },
  {
    test: /\.css$/i,
    loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]'
  }
];

webpack_config.plugins = [
  new webpack.DefinePlugin(config.development.CONSTANTS),
  new HtmlWebpackPlugin({
    filename: config.path.html,
    title: config.development.title,
    template: path.join(config.path.src, 'index.html')
  }),
  ...webpack_config.plugins,
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
];

export default {
  ...webpack_config,
  debug: true,
  devtool: 'inline-source-map'
};

if (require.main === module) {
  fs.rmrf(webpack_config.output.path);
  fs.mkdirp(webpack_config.output.path);
  const compiler = webpack(exports['default']);
  compiler.run(callback);
}
