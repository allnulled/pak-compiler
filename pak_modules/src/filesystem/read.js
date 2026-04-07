module.exports = function(file) {
  return require("fs").promises.readFile(file, "utf8");
};