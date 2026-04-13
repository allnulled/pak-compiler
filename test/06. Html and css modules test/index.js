(async function main() {
  const path = require("path");
  const projectRoot = path.resolve(__dirname + "/06. Html and css modules test/modules");
  const compiler = PakCompiler.create(projectRoot);
  const bundleData = await compiler.build("main.js");
  const htmlModule = await compiler.run("main.js");
  // Note the template was injected where it was suposed to:
  PakCompiler.assert(typeof htmlModule.name === "string", "Property name must be string");
  PakCompiler.assert(typeof htmlModule.template === "string", "Property template must be string too");
  PakCompiler.assert(typeof htmlModule.template.indexOf("Component") !== -1, "Property template must contain Component substring");
  // Note the order they are loaded is the correct:
  PakCompiler.assert(bundleData.cssModules[0] === "anteriores-estilos-a.css");
  PakCompiler.assert(bundleData.cssModules[1] === "anteriores-estilos-b.css");
  PakCompiler.assert(bundleData.cssModules[2] === "component-1.css");
})();