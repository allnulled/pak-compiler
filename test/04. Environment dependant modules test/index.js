(async function main() {
  const fs = require("fs");
  const read = file => fs.promises.readFile(file, "utf8");
  const write = (file, content) => fs.promises.writeFile(file, content, "utf8");
  const assert = PakCompiler.assert;
  let payload = ""; // @OK: con esto, pasa ok
  payload = "-cross"; // @TODO: ahora tiene que pasar con esto
  const outputs = await Promise.all([
    PakCompiler.global.build(`04. Environment dependant modules test/entries${payload}/cli.js`),
    PakCompiler.global.build(`04. Environment dependant modules test/entries${payload}/gui.js`),
    PakCompiler.global.build(`04. Environment dependant modules test/entries${payload}/server.js`),
    PakCompiler.global.build(`04. Environment dependant modules test/entries${payload}/nodejs.js`),
    PakCompiler.global.build(`04. Environment dependant modules test/entries${payload}/browser.js`)
  ]);
  const [ cli, gui, server, nodejs, browser ] = outputs;
  await write(`${__dirname}/04. Environment dependant modules test/environments/cli/test.cli-dist.js`, cli.js);
  await write(`${__dirname}/04. Environment dependant modules test/environments/gui/test.gui-dist.js`, gui.js);
  await write(`${__dirname}/04. Environment dependant modules test/environments/server/test.server-dist.js`, server.js);
  await write(`${__dirname}/04. Environment dependant modules test/environments/nodejs/test.nodejs-dist.js`, nodejs.js);
  await write(`${__dirname}/04. Environment dependant modules test/environments/browser/test.browser-dist.js`, browser.js);
  const cliModule = require(`${__dirname}/04. Environment dependant modules test/environments/cli/test.cli-dist.js`);
  const guiModule = require(`${__dirname}/04. Environment dependant modules test/environments/gui/test.gui-dist.js`);
  const serverModule = require(`${__dirname}/04. Environment dependant modules test/environments/server/test.server-dist.js`);
  const nodejsModule = require(`${__dirname}/04. Environment dependant modules test/environments/nodejs/test.nodejs-dist.js`);
  const browserModule = require(`${__dirname}/04. Environment dependant modules test/environments/browser/test.browser-dist.js`);
  assert(cliModule === "cli", "Module cli should be 'cli'");
  assert(guiModule === "gui", "Module gui should be 'gui'");
  assert(serverModule === "server", "Module server should be 'server'");
  assert(nodejsModule === "nodejs", "Module nodejs should be 'nodejs'");
  assert(browserModule === "browser", "Module browser should be 'browser'");
})();