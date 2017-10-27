import SubCommand from '../models/sub-command';
import Blueprint from '../models/blueprint';
import CloneBlueprint from '../tasks/clone-blueprint';
import chalk from 'chalk';

// Primary purpose is to take cli args and pass them through
// to the proper task that will do the generation.
//
// Logic for displaying all blueprints and what their options
// are will live in here.  For now it's pretty baren.
class Clone extends SubCommand {
  constructor(options) {
    super(options);
    this.cloneTask = new CloneBlueprint(this.environment);
  }

  run(blueprintName, cliArgs) {
    if (cliArgs.debug) {
      this.ui.setWriteLevel('DEBUG');
    }

    this.cloneTask.run(blueprintName, cliArgs);
  }
}

export default Clone;
