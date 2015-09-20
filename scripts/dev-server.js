import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import { dev_server as config } from '../config';
import webpack_config from './webpack.dev.config';

const compiler = webpack(webpack_config);
const server = new WebpackDevServer(compiler, {
  hot: true,
  historyApiFallback: true,
  lazy: false,
  quiet: true,
  noInfo: true,
  stats: { colors: true },
  publicPath: webpack_config.output.publicPath
});

server.listen(config.port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 💻 Development server listening on port %s', config.port);
  }
});
