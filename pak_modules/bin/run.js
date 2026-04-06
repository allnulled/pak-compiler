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

const moduleId = args.shift();

require(path.resolve(PakCompiler.global.basedir, "dist", moduleId, moduleId + ".dist.js"));