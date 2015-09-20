import chalk from 'chalk';

var lastHash = null;
export default function compilerCallback(err, stats) {
  if(err) {
    lastHash = null;
    console.error(err.stack || err);
    if(err.details) console.error(err.details);
    console.info(chalk.white.bgRed(  '               BUILD FAILED                '));
    return;
  }
  if(stats.hash !== lastHash) {
    lastHash = stats.hash;
    process.stdout.write(stats.toString({ colors: true }) + "\n");
    console.info(chalk.white.bgGreen('               BUILD SUCCESS               '));
  }
};
