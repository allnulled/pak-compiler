#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const projectRoot = path.resolve(__dirname, "../..");
const PakCompilerPath = path.resolve(projectRoot, "pak-compiler.dist.js");
const PakCompiler = require(PakCompilerPath);
const colorsPath = path.resolve(projectRoot, "pak_modules/src/command-line/colors.js");
const colors = require(colorsPath);
PakCompiler.global.setBasedir(path.resolve(projectRoot, "pak_modules"));
const argumentsParser = require(PakCompiler.global.basedir + "/src/command-line/parse-args-into-object.js");
const argv = [...process.argv];
const args0 = argv.splice(2);
if(args0.length === 0) {
  require(__dirname + "/command/help.js")(args0);
  throw new Error(`Command «pak» requires at least 1 parameter for the command but 0 were found by command line arguments on «pak»`);
}
const [ command, project = "default" ] = args0;
const commandsSchema = {
  help: {},
  init: {},
  build: {
    entry: { alias: "f" },
  },
  run: {
    entry: { alias: "f" },
    mode: { alias: "m" },
  }
};
if(!(command in commandsSchema)) {
  throw new Error(`Command «pak ${command}» is not available, only «${Object.keys(commandsSchema).join("|")}» on «pak»`);
}
const args1 = argumentsParser(args0, commandsSchema[command]);
console.log(colors.style("yellow,bold").text("Argumentos de pak:"));
console.log(args1);
// hasta aquí es cli
const callback = require(__dirname + "/command/" + command + ".js");
module.exports = callback(args1, { projectRoot, colors, PakCompiler, commandsSchema });