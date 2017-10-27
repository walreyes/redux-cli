import path from 'path';
import { copySync } from 'fs-extra';
import walkSync from 'walk-sync';

import { fileExists } from '../util/fs';

const FILES_BLACKLIST = ['.ds_store', '.git', '.gitkeep'];

export default class BlueprintCloner {
  constructor(blueprint, options) {
    this.blueprint = blueprint;
    this.options = options || {};
    this.ui = options.ui;
  }

  clone() {
    const blueprint  = this.blueprint;
    this.ui.writeInfo('cloning blueprint...');

    const cloneToDirectory = this.cloneToDirectory();
    this.ui.writeInfo('cloning into: ' + cloneToDirectory);

    const blueprintFiles = this.blueprintFiles();
    this.cloneFiles(blueprint.path, cloneToDirectory, blueprintFiles);
  }

  cloneFiles(sourceDirectory, cloneToDirectory, files) {
    files.forEach((file) => {
      let sourcePath = path.resolve(sourceDirectory, file);
      let destinationPath = path.resolve(cloneToDirectory, file);
      this.cloneFile(sourcePath, destinationPath);
    });
  }

  cloneFile(sourcePath, destinationPath) {
    const ui = this.ui;
    const dryRun = this.options.dryRun;

    ui.writeDebug(`Attempting to clone file: ${destinationPath}`);
    if (fileExists(destinationPath)) {
      ui.writeError(
        `Not writing file.  File already exists at: ${destinationPath}`
      );
    } else {
      if (!dryRun) {
        copySync(sourcePath, destinationPath);
        ui.writeCreate(destinationPath);
      } else {
        ui.writeWouldCreate(destinationPath);
      }
    }
  }

  cloneToDirectory() {
    const settings = this.options.settings;

    // settings.blueprints.searchPaths[0] will be settings.cloneTo
    return path.resolve(settings.blueprints.searchPaths[0], this.newBlueprintName());
  }

  newBlueprintName() {
    const options = this.options;

    if(options.entity) {
      return options.entity.name;
    }
  }

  blueprintFiles() {
    const blueprint = this.blueprint;
    let blueprintFiles = walkSync(blueprint.path, { directories: false, ignore: FILES_BLACKLIST });
    blueprintFiles = this.filterBlacklistedFiles(blueprintFiles);
    return blueprintFiles;
  }

  filterBlacklistedFiles(files) {
    return files.filter((file) => !this.isBlacklistedFile(file));
  }

  isBlacklistedFile(file) {
    const fileName = path.basename(file).toLowerCase();
    return FILES_BLACKLIST.includes(fileName);
  }
}
