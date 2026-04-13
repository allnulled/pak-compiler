const fs = require("fs");
const path = require("path");

module.exports = async function (args1, utils) {
  try {
    const out = await require(__dirname + "/build.js")(args1, utils);
    return require(out.dist.jsFile);
  } catch (error) {
    console.log(utils.colors.style("red,bold").text(`${error.name}: ${error.message}\n@@ ${error.stack}`));
  }
  // console.log(out.dist.js);
};