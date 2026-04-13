module.exports = async function (args, utils) {
  const { projectRoot } = utils;
  try {
    const fs = require("fs");
    const path = require("path");
    // const findClosestPakProjectDirectory = require(`${projectRoot}/pak_modules/src/pak.utils.findClosestPakProjectDirectory.js`);
    const source = `${projectRoot}/pak_modules`;
    const destination = process.cwd();
    const files = await fs.promises.readdir(destination);
    if (files.length) {
      throw new Error("Cannot start pak project in a non-empty directory: " + destination);
    }
    const modulesDir = path.resolve(destination, "pak_modules");
    await fs.promises.mkdir(modulesDir);
    await fs.promises.cp(source, modulesDir, { recursive: true });
    await fs.promises.copyFile(path.resolve(projectRoot, "dev.sh"), path.resolve(destination, "dev.sh"));
    await fs.promises.copyFile(path.resolve(projectRoot, "build.sh"), path.resolve(destination, "build.sh"));
    console.log(utils.colors.style("green,bold").text(`[*] Created pak project successfully on:`) + `\n   - ${destination}`);
  } catch (error) {
    console.log(utils.colors.style("red,bold").text(`${error.name}: ${error.message}\n@@ ${error.stack}`));
  }
}