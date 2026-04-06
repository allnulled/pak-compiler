// Ya viene importado del test.js:
// require(__dirname + "/../pak-compiler.dist.js");

(async function main() {
  
  const mod78 = await PakCompiler.global.run("03. Evaluator test/mod78.js");
  
  PakCompiler.assert(78 === mod78, "Module mod78 should be 78");

})();