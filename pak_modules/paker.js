const PakCompiler = require(__dirname + "/../pak-compiler.dist.js");

PakCompiler.global.setBasedir(__dirname);

const main = async function () {

  const { js, css } = await PakCompiler.global.build("application/main.js");

  require("fs").writeFileSync(__dirname + "/dist.css", css, "utf8");
  require("fs").writeFileSync(__dirname + "/dist.js", js, "utf8");

  require(__dirname + "/dist.js");

};

main();