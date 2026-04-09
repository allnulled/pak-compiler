const fs = require("fs");
const path = require("path");

module.exports = async function (args1, utils) {
  const out = await require(__dirname + "/build.js")(args1, utils);
  // console.log(out.dist.js);
  return require(out.dist.jsFile);
};