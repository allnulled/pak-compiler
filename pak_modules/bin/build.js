#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const projectRoot = path.resolve(__dirname, "../..");
const PakCompilerPath = path.resolve(projectRoot, "pak-compiler.dist.js");
const PakCompiler = require(PakCompilerPath);

PakCompiler.global.setBasedir(path.resolve(projectRoot, "pak_modules"));

const args = [...process.argv];

args.shift();
args.shift();

const main = async function () {

  for (let index = 0; index < args.length; index++) {

    const arg = args[index];
    const out = await PakCompiler.global.build(`projects/${arg}/main.js`);

    const { js, css } = out;
    const outDir = path.resolve(__dirname, "../dist", arg);
    const outFileUnextended = path.resolve(outDir, arg);
    const outJsFile = `${outFileUnextended}.dist.js`;
    const outCssFile = `${outFileUnextended}.dist.css`;
    try {
      await fs.promises.mkdir(outDir);
    } catch (error) {
      // @OK: it can already exist
    }
    await fs.promises.writeFile(outJsFile, js, "utf8");
    await fs.promises.writeFile(outCssFile, css, "utf8");

  }

};

main();