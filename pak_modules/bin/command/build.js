const fs = require("fs");
const path = require("path");

module.exports = async function (argsInput, utils) {
  const args = {
    file: argsInput.file && argsInput.file.length ? argsInput.file[0].replace(/\.js$/g, "") : "main",
    command: argsInput._[0] || "build",
    project: argsInput._[1] || "default",
  };
  PakCompiler.assert(typeof args === "object", "Parameter «args» must be object on «pak build»");
  PakCompiler.assert(typeof args.file === "string", "Parameter «args.file» must be string on «pak build»");
  PakCompiler.assert(typeof args.command === "string", "Parameter «args.command» must be string on «pak build»");
  PakCompiler.assert(typeof args.project === "string", "Parameter «args.project» must be string on «pak build»");
  delete args._;
  // Compilas el proyecto:
  const command = args.command;
  const project = args.project;
  const file = args.file;
  const out = await PakCompiler.global.build(`projects/${project}/${file}.js`);
  // Persistes los distribuibles:
  const { js, css } = out;
  const outDir = path.resolve(__dirname, "../../dist", project);
  const outFileUnextended = path.resolve(outDir, file);
  const outJsFile = `${outFileUnextended}.dist.js`;
  const outCssFile = `${outFileUnextended}.dist.css`;
  try {
    await fs.promises.mkdir(outDir);
  } catch (error) {
    // @OK: it can already exist
  }
  await fs.promises.writeFile(outJsFile, js, "utf8");
  await fs.promises.writeFile(outCssFile, css, "utf8");
  // Retornas
  return { dist: { js, css } };
};