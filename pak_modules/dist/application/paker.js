const path = require("path");
const projectRoot = path.resolve(__dirname + "/../../../");
const PakCompiler = require(`${projectRoot}/pak-compiler.dist.js`);
const projectModulesPath = path.resolve(projectRoot, "pak_modules");

PakCompiler.global.setBasedir(projectModulesPath);

const main = async function () {

  const { js, css } = await PakCompiler.global.build("application/main.js");

  require("fs").writeFileSync(__dirname + "/application.css", css, "utf8");
  require("fs").writeFileSync(__dirname + "/application.js", js, "utf8");

  require(__dirname + "/application.js");

};

main();