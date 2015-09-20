import path from 'path';
import fs from 'fs.extra';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import * as config from '../config';

fs.rmrf(config.path.output);
fs.mkdirp(config.path.output);

export default {
  context: config.path.root,
  entry: {
    'main': [
      'webpack/hot/dev-server',
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
  devtool: 'inline-source-map',
  progress: true,
  resolve: {
    moduleDirectories: [
      config.path.src,
      'node_modules'
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(config.development.CONSTANTS),
    new HtmlWebpackPlugin({
      title: config.development.title,
      filename: config.path.html
    })
  ]
};

if (require.main === module) {
  const compiler = webpack(exports['default']);
  compiler.run(console.log);
}
