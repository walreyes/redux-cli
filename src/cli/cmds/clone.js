import getHandler from '../handler';
import handlers from './clone/handlers';

getHandler().onRun('clone', handlers.handleRun);

const usage = `Usage:
  $0 clone <blueprint> <name>`;

module.exports = {
  command: 'clone <blueprint> <name>',
  aliases: [],
  describe: 'Clone a blueprint with a different name',
  builder: yargs => {
    yargs
      .usage(usage)
      .option('dry-run', {
        alias: 'd',
        describe: "List files but don't generate them",
        type: 'boolean'
      })
      .group(['dry-run', 'help'], 'Clone Options:');

    return yargs;
  }
};
