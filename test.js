require(__dirname + "/pak-compiler.js");

const main = async function () {
  console.log("starting");
  const { js, css, jsModules, cssModules } = await PakCompiler.global.build("pak_modules/test/01. Simple test/index.js");
  require("fs").writeFileSync('test.dist.js', js, "utf8");
  require("fs").writeFileSync('test.dist.css', css, "utf8");
  throw new Error("What");
};

main();