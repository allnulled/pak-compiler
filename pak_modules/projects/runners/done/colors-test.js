const fs = Pak.require("src/filesystem/all.js");
const colors = Pak.require("src/command-line/colors.js");

console.log(colors);

console.log(colors.style("magenta").text("Ei, what is up") + colors.style("yellow").text(" but in colors") + colors.style("red").text("!!"));