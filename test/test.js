const fs = require("fs");
const path = require("path");
const PakCompiler = require(__dirname + "/../pak-compiler.dist.js");

PakCompiler.isTracing = false;

const main = async function () {
  PakCompiler.global.setBasedir(__dirname);
  const buildJson = await PakCompiler.global.build("build.js");
  const { js, css, jsModules, cssModules } = buildJson;
  fs.writeFileSync(__dirname + '/test.dist.js', js, "utf8");
  fs.writeFileSync(__dirname + '/test.dist.css', css, "utf8");
  const start = new Date();
  await require(__dirname + "/test.dist.js");
  const end = new Date();
  console.log(`[*] Compiled tests execution took: ${(end - start) / 1000} seconds`);
};

main();