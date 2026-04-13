const child_process = require("child_process");
const fs = require("fs");
const path = require("path");
const projectRoot = path.resolve(__dirname, "../../..");
const relativePath = function (...args) {
  return path.resolve(projectRoot, ...args);
}

module.exports = async function (args, utils) {
  try {
    args._.shift();
    const { projectRoot } = utils;
    const targetType = args._.shift();
    const findClosestPakProjectDirectory = require(`${projectRoot}/pak_modules/src/pak.utils.findClosestPakProjectDirectory.js`);
    const projectPath = await findClosestPakProjectDirectory(process.cwd());
    const pakModulesDir = path.resolve(projectPath, "pak_modules");
    const fixedCmdOptions = { stdio: "inherit" };
    const listables = {
      commands: () => { child_process.execSync("tree", { cwd: path.resolve(pakModulesDir, "bin/command"), ...fixedCmdOptions }); },
      sources: () => { child_process.execSync("tree", { cwd: path.resolve(pakModulesDir, "src"), ...fixedCmdOptions }); },
      projects: () => { child_process.execSync("tree", { cwd: path.resolve(pakModulesDir, "projects"), ...fixedCmdOptions }); },
      distribuibles: () => { child_process.execSync("tree", { cwd: path.resolve(pakModulesDir, "dist"), ...fixedCmdOptions }); },
    };
    if (!(targetType in listables)) {
      throw new Error(`Command «pak list ?» only accepts «${Object.keys(listables).join('|')}» and not «${targetType}»`);
    }
    const callback = listables[targetType];
    console.log(utils.colors.style("yellow,bold,underline").text(`[pak] List of ${targetType}:`));
    return callback();
  } catch (error) {
    console.log(utils.colors.style("red,bold").text(`${error.name}: ${error.message}\n@@ ${error.stack}`));
  }
};