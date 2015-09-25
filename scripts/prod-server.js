import chalk from 'chalk';
import express from 'express';
import history from 'connect-history-api-fallback';

import * as config from '../config';

const app = express();

app.use(express.static(config.path.content_base));
app.use(history());
app.listen(config.prod_server.port, config.prod_server.host, err => {
  if (err) {
    console.info(chalk.white.bgRed(  '           SERVER START FAILED           '));
    console.error(err);
  } else {
    console.info(chalk.white.bgGreen('        SERVER STARTED ON PORT %s        '), config.prod_server.port);
  }
});
