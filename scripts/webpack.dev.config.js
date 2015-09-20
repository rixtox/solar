import path from 'path';
import fs from 'fs.extra';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import * as config from '../config';
import webpack_config from './webpack.config';
import callback from './utils/webpack-callback';

webpack_config.output.path = path.resolve(config.path.output, 'dev-server');

webpack_config.entry.main = [
  ...webpack_config.entry.main,
  'webpack/hot/only-dev-server?/',
  'webpack-dev-server/client?/'
];

webpack_config.plugins = [
  new webpack.DefinePlugin(config.development.CONSTANTS),
  new HtmlWebpackPlugin({
    title: config.development.title,
    filename: config.path.html
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
