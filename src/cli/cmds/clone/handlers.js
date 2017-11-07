import getEnvironment from '../../environment';
import { logYargs } from '../../yargs';
import Clone from '../../../sub-commands/clone';

const handlers = {
  handleRun
};

export default handlers;

function handleRun(argv, yargs, rawArgs = process.argv.slice(3)) {
  const blueprintName = argv.blueprint;
  const environment = getEnvironment();

  if (blueprintExists(environment.settings.blueprints, blueprintName)) {
    const subCommand = new Clone(environment);
    subCommand.run(argv.blueprint, argv);
  } else {
    logYargs(yargs, `Unknown blueprint '${blueprintName}'`);
  }
}

function blueprintExists(blueprints, blueprintName) {
  return blueprints.lookup(blueprintName);
}
