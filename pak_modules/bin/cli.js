#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const projectRoot = path.resolve(__dirname, "../..");
const PakCompilerPath = path.resolve(projectRoot, "pak-compiler.dist.js");
const PakCompiler = require(PakCompilerPath);
PakCompiler.assert(process.argv.length > 3, `Interface «pak» requires at least 2 parameters but only ${process.argv.length} were found by command line arguments on «bin/build.js»`);
PakCompiler.global.setBasedir(path.resolve(projectRoot, "pak_modules"));
const argumentsParser = require(PakCompiler.global.basedir + "/src/command-line/parse-args-into-object.js");

const argv = [...process.argv];
const args0 = argv.splice(2);
const [ command, project ] = args0;

const commandsSchema = {
  build: {
    file: { alias: "f" },
  },
  run: {
    file: { alias: "f" },
    mode: { alias: "m" },
  }
};

console.log(args0);

if(!(command in commandsSchema)) {
  throw new Error(`Command «${command}» is not available, only «${Object.keys(commandsSchema).join("|")}» on «pak»`);
}

const args1 = argumentsParser(args0, commandsSchema[command]);

if("file" in args1) {
  PakCompiler.assert(args1.file.length === 1, "Interface «pak» requires parameter «--file|-f» to appear or none or once only on «bin/build.js»");
}

const args = {};
args.command = args1._[0];
args.project = args1._[1];
args.file = args1.file[0];
delete args._;

console.log(args);

// hasta aquí es cli

// desde aquí es build o run

const main = async function () {

  // Compilas el proyecto:
  const command = args.command;
  const project = args.project;
  const file = args.file;
  const out = await PakCompiler.global.build(`projects/${project}/${file}`);

  // Persistes los distribuibles:
  const { js, css } = out;
  const outDir = path.resolve(__dirname, "../dist", project);
  const outFileUnextended = path.resolve(outDir, file.replace(/\.js$/g, ""));
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
  return { dist: { js: outJsFile, css: outCssFile } };

};

module.exports = main();