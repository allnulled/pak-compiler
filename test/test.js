const fs = require("fs");
const path = require("path");
const PakCompiler = require(__dirname + "/../pak-compiler.dist.js");

global.__PAK_COMPILER_TEST_NAMESPACE__ = {};

const main = async function () {
  console.log("starting");
  PakCompiler.global.setBasedir(__dirname);
  const buildJson = await PakCompiler.global.build("build.js");
  const { js, css, jsModules, cssModules } = buildJson;
  fs.writeFileSync(__dirname + '/test.dist.js', js, "utf8");
  fs.writeFileSync(__dirname + '/test.dist.css', css, "utf8");
  await require(__dirname + "/test.dist.js");
  
};

main();