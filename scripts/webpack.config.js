import path from 'path';
import fs from 'fs.extra';
import webpack from 'webpack';

import * as config from '../config';
import callback from './utils/webpack-callback';

export default {
  context: config.path.root,
  entry: {
    'main': [
      config.path.entry
    ]
  },
  output: {
    path: config.path.output,
    filename: '[name]-[hash].js',
    publicPath: config.path.public,
    chunkFilename: '[name]-[chunkhash].js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel?optional[]=runtime&stage=0'] }
    ]
  },
  plugins: [],
  debug: false,
  devtool: 'source-map',
  progress: true,
  resolve: {
    moduleDirectories: [
      config.path.src,
      'node_modules'
    ]
  }
};

if (require.main === module) {
  fs.rmrf(config.path.output);
  fs.mkdirp(config.path.output);
  const compiler = webpack(exports['default']);
  compiler.run(callback);
}
