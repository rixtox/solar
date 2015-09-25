import fs from 'fs.extra';
import webpack from 'webpack';

import webpack_config from './webpack.prod.config';
import callback from './utils/webpack-callback';

fs.rmrf(webpack_config.output.path);
fs.mkdirp(webpack_config.output.path);

const compiler = webpack(webpack_config);
compiler.run(callback);
