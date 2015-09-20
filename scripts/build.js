import webpack from 'webpack';

import webpack_config from './webpack.prod.config';
import callback from './utils/webpack-callback';

const compiler = webpack(webpack_config);
compiler.run(callback);
