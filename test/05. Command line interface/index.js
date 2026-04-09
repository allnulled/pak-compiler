(async function main() {
  const fs = require("fs");
  const timers = require("timers");
  const child_process = require("child_process");
  const read = file => fs.promises.readFile(file, "utf8");
  const write = (file, content) => fs.promises.writeFile(file, content, "utf8");
  const assert = PakCompiler.assert;
  try {
    await fs.promises.rm(`${__dirname}/05. Command line interface/nowatch`, { recursive: true });
  } catch (error) {
    // @OK because it should not exist already
  }
  // await timers.promises.setTimeout(200);
  await fs.promises.mkdir(`${__dirname}/05. Command line interface/nowatch`);
  await fs.promises.mkdir(`${__dirname}/05. Command line interface/nowatch/example-1`);
  await fs.promises.mkdir(`${__dirname}/05. Command line interface/nowatch/example-2`);
  await fs.promises.mkdir(`${__dirname}/05. Command line interface/nowatch/example-3`);
  child_process.execSync(`pak init`, { cwd: `${__dirname}/05. Command line interface/nowatch/example-1`, stdio: "inherit" });
  child_process.execSync(`pak init`, { cwd: `${__dirname}/05. Command line interface/nowatch/example-2`, stdio: "inherit" });
  child_process.execSync(`pak init`, { cwd: `${__dirname}/05. Command line interface/nowatch/example-3`, stdio: "inherit" });  
  await fs.promises.mkdir(`${__dirname}/05. Command line interface/nowatch/example-3/pak_modules/projects/default`);
  await write(`${__dirname}/05. Command line interface/nowatch/example-3/hello.txt`, "");
  await write(`${__dirname}/05. Command line interface/nowatch/example-3/pak_modules/projects/default/main.js`, "require('fs').writeFileSync(__dirname + '/hello.txt', 'hello from example 3', 'utf8');", "utf8");
  child_process.execSync(`pak run`, { cwd: `${__dirname}/05. Command line interface/nowatch/example-3`, stdio: "inherit" });
  PakCompiler.assert("hello from example 3" === await read(`${__dirname}/05. Command line interface/nowatch/example-3/pak_modules/dist/default/hello.txt`), "File hello.txt should be fulfilled adecuately");
  await fs.promises.rm(`${__dirname}/05. Command line interface/nowatch`, { recursive: true });
})();