module.exports = function(file, content) {
  return require("fs").promises.writeFile(file, content, "utf8");
};