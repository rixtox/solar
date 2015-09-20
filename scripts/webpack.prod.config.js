import path from 'path';
import fs from 'fs.extra';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import * as config from '../config';
import webpack_config from './webpack.config';
import callback from './utils/webpack-callback';

webpack_config.plugins = [
  new ExtractTextPlugin('[name]-[chunkhash].css', {
    allChunks: true
  }),
  new webpack.DefinePlugin(config.production.CONSTANTS),
  new HtmlWebpackPlugin({
    title: config.production.title,
    filename: config.path.html
  }),
  ...webpack_config.plugins,
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
];

export default webpack_config;

if (require.main === module) {
  fs.rmrf(webpack_config.output.path);
  fs.mkdirp(webpack_config.output.path);
  const compiler = webpack(exports['default']);
  compiler.run(callback);
}
