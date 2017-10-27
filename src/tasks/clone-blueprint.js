import Task from '../models/task';
import BlueprintCloner from '../models/blueprint-cloner';

export default class extends Task {
  constructor(environment) {
    super(environment);
  }

  run(blueprintName, cliArgs) {
    const blueprint = this.lookupBlueprint(blueprintName);

    const entity = {
      name: cliArgs.entity.name,
      options: cliArgs.entity.options
    };

    const blueprintOptions = {
      originalBlueprintName: blueprintName,
      ui: this.ui,
      settings: this.settings,
      dryRun: cliArgs.dryRun,
      entity
    };

    const blueprintCloner = new BlueprintCloner(blueprint, blueprintOptions);
    blueprintCloner.clone();
  }

  lookupBlueprint(name) {
    return this.settings.blueprints.lookup(name);
  }
}
