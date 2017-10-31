import buildBlueprintCommands from './clone/build-blueprint-commands';

const usage = `Usage:
  $0 clone <blueprint> <name>
  $0 help clone <blueprint>`;

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
      .option('verbose', {
        alias: 'v',
        describe: 'Verbose output, including file contents',
        type: 'boolean'
      })
      .group(['dry-run', 'verbose', 'help'], 'Generate Options:')
      .updateStrings({
        'Commands:': 'Blueprints:',
        'Options:': 'Blueprint Options:'
      });
    return buildBlueprintCommands().reduce(
      (yargs, command) => yargs.command(command),
      yargs
    );
  },
  handler: argv => console.error(`Unrecognised blueprint '${argv.blueprint}'`)
};
