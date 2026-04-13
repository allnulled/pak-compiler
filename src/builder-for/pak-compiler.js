const fs = require("fs");
const path = require("path");

const REGEX_FOR_SNIPPET = /__PAK_SNIPPET__\.([A-Za-z\$\_][A-Za-z0-9\$\_]*)/g;

const readableStringify = function(text, spaces = 0) {
  return "(\n" + text.split("\n").map((line) => " ".repeat(spaces) + JSON.stringify(line + "\n")).join("+\n") + "\n" + " ".repeat(spaces-1) + ")";
}

let isTracing = false;

const main = async function() {
  const trace = function(text) {
    if(!isTracing) return;
    console.log("[pak-compiler][trace] " + text);
  }
  const start = new Date();
  trace("Start of: src/builder-for/pak-compiler.js");
  const templateFile = path.resolve(__dirname + "/../../pak-compiler.template.js");
  const templateSource = await fs.promises.readFile(templateFile, "utf8");
  const snippets = [];
  templateSource.replace(REGEX_FOR_SNIPPET, function(match, group1) {
    snippets.push(group1);
    return match;
  });
  for(let index=0; index<snippets.length; index++) {
    const snippet = snippets[index];
    let text = await fs.promises.readFile(`${__dirname}/../snippets/${snippet}.js`, "utf8");
    snippets[index] = text;
  }
  let counter = 0;
  const output = templateSource.replace(REGEX_FOR_SNIPPET, function(match, group1) {
    return readableStringify(snippets[counter++], 9);
  });
  fs.writeFileSync(`${__dirname}/../../pak-compiler.dist.js`, output, "utf8");
  const duration = ((new Date()) - start) / 1000;
  trace("Pak compiler compilation took: " + duration + " seconds");
  trace("End of: src/builder-for/pak-compiler.js");
};

main();
