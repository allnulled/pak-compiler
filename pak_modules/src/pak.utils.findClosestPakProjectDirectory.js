module.exports = async function(currentDir = process.cwd()) {
  const fs = require("fs");
  const path = require("path");
  let dir = currentDir;
  let projectDir = undefined;
  let previousDir = undefined;
  Going_up:
  do {
    const files = await fs.promises.readdir(dir);
    const isPakProjectDir = files.filter(file => file === "pak_modules").length !== 0;
    if(isPakProjectDir) {
      projectDir = dir;
      break Going_up;
    }
    try {
      previousDir = dir;
      dir = path.dirname(dir);
    } catch (error) {
      dir = false;
    }
  } while(dir !== previousDir);
  return projectDir || currentDir;
};