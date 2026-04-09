// @pak-module:
// - Source generated:
//    - date:         Thu Apr 09 2026 16:19:52 GMT+0200 (hora de verano de Europa central)
//    - time:         0.042 seconds
//    - modules:      17
//       - 0. Pak.require("01. Simple test/mod-a/mod-a1.js")
//       - 1. Pak.require("01. Simple test/mod-a/mod-a2.js")
//       - 2. Pak.require("01. Simple test/mod-a/mod-a3.js")
//       - 3. Pak.require("01. Simple test/mod-a.js")
//       - 4. Pak.require("01. Simple test/mod-b/componente-b1.js")
//       - 5. Pak.require("01. Simple test/mod-b/componente-b2.js")
//       - 6. Pak.require("01. Simple test/mod-b/componente-b3.js")
//       - 7. Pak.require("01. Simple test/mod-b.js")
//       - 8. Pak.require("01. Simple test/index.js")
//       - 9. Pak.require("02. Drivers test/modules/first.js")
//       - 10. Pak.require("02. Drivers test/modules/second.js")
//       - 11. Pak.require("02. Drivers test/modules/third.js")
//       - 12. Pak.require("02. Drivers test/index.js")
//       - 13. Pak.require("03. Evaluator test/index.js")
//       - 14. Pak.require("04. Environment dependant modules test/index.js")
//       - 15. Pak.require("05. Command line interface/index.js")
//       - 16. Pak.require("build.js")
//    - styles:       4
//       - 0. Pak.require("01. Simple test/mod-a/styles-a.css")
//       - 1. Pak.require("01. Simple test/mod-a/styles-a1.css")
//       - 2. Pak.require("01. Simple test/mod-a/styles-a2.css")
//       - 3. Pak.require("01. Simple test/mod-a/styles-a3.css")
//    - templates:    3
//       - 0. Pak.require("01. Simple test/mod-b/componente-b1.html")
//       - 1. Pak.require("01. Simple test/mod-b/componente-b2.html")
//       - 2. Pak.require("01. Simple test/mod-b/componente-b3.html")
// @module[main] = Pak
(function(globalPak) {
  //////////////////////////////////////////////////////////////////////////////
  let __LAST_PAK_RESULT__ = undefined;
  const Pak = {
    // API de Pak Asserter: 1/3
    assert: (condition, message) => {
      if (!condition) {
        throw new Error(message);
      }
    },
    // API de Pak Modules: 2/3
    entry: "build",
    modules: typeof globalPak === "object" ? Object.create(globalPak.modules) : {},
    require: function(originalId) {
      const id = Pak.resolveDriver(originalId);
      if (id.endsWith(".css")) {
        return undefined;
      }
      if (id.endsWith(".html")) {
        return undefined;
      }
      if (!(id in Pak.modules)) {
        throw new Error("Module not found «" + id + "» on «Pak.require»");
      }
      return Pak.modules[id];
    },
    // API de Pak Drivers: 3/3
    drivers: {
      "drivers-test/first": "02. Drivers test/modules/first.js",
      "drivers-test/second": "02. Drivers test/modules/second.js",
      "drivers-test/third": "02. Drivers test/modules/third.js",
      "drivers-test/modules": "02. Drivers test/modules"
    },
    driverIds: false,
    resolveDriver: function(id) {
      if (!this.driverIds) {
        this.driverIds = Object.keys(this.drivers).sort((a, b) => {
          return a.length > b.length ? -1 : a.length < b.length ? 1 : 0;
        });
      }
      for (let index = 0; index < this.driverIds.length; index++) {
        const key = this.driverIds[index];
        if (id.startsWith(key)) {
          return id.replace(key, this.drivers[key]);
        }
      }
      return id;
    },
  };
  // Exporta Pak si no hay ya uno:
  if (typeof window !== "undefined" && typeof window.Pak === "undefined") window.Pak = Pak;
  if (typeof global !== "undefined" && typeof global.Pak === "undefined") global.Pak = Pak;
  //////////////////////////////////////////////////////////////////////////////

  // @module[1] = 01. Simple test/mod-a/mod-a1.js
  (function(module) {
    try {
      Pak.require("01. Simple test/mod-a/styles-a1.css");
    } catch (error) {
      console.log("⛔️ Error on module 01. Simple test/mod-a/mod-a1.js\n  ", error);
      throw error;
    } finally {
      __LAST_PAK_RESULT__ = Pak.modules["01. Simple test/mod-a/mod-a1.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[2] = 01. Simple test/mod-a/mod-a2.js
  (function(module) {
    try {
      Pak.require("01. Simple test/mod-a/styles-a2.css");

    } catch (error) {
      console.log("⛔️ Error on module 01. Simple test/mod-a/mod-a2.js\n  ", error);
      throw error;
    } finally {
      __LAST_PAK_RESULT__ = Pak.modules["01. Simple test/mod-a/mod-a2.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[3] = 01. Simple test/mod-a/mod-a3.js
  (function(module) {
    try {
      Pak.require("01. Simple test/mod-a/styles-a3.css");

    } catch (error) {
      console.log("⛔️ Error on module 01. Simple test/mod-a/mod-a3.js\n  ", error);
      throw error;
    } finally {
      __LAST_PAK_RESULT__ = Pak.modules["01. Simple test/mod-a/mod-a3.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[4] = 01. Simple test/mod-a.js
  (function(module) {
    try {
      const a1 = Pak.require("01. Simple test/mod-a/mod-a1.js");
      const a2 = Pak.require("01. Simple test/mod-a/mod-a2.js");
      const a3 = Pak.require("01. Simple test/mod-a/mod-a3.js");


    } catch (error) {
      console.log("⛔️ Error on module 01. Simple test/mod-a.js\n  ", error);
      throw error;
    } finally {
      __LAST_PAK_RESULT__ = Pak.modules["01. Simple test/mod-a.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[5] = 01. Simple test/mod-b/componente-b1.js
  (function(module) {
    try {
      module.exports = {
        name: "whatever",
        template: "TEMPLATE DE B1.html"
      };
    } catch (error) {
      console.log("⛔️ Error on module 01. Simple test/mod-b/componente-b1.js\n  ", error);
      throw error;
    } finally {
      __LAST_PAK_RESULT__ = Pak.modules["01. Simple test/mod-b/componente-b1.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[6] = 01. Simple test/mod-b/componente-b2.js
  (function(module) {
    try {

    } catch (error) {
      console.log("⛔️ Error on module 01. Simple test/mod-b/componente-b2.js\n  ", error);
      throw error;
    } finally {
      __LAST_PAK_RESULT__ = Pak.modules["01. Simple test/mod-b/componente-b2.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[7] = 01. Simple test/mod-b/componente-b3.js
  (function(module) {
    try {

    } catch (error) {
      console.log("⛔️ Error on module 01. Simple test/mod-b/componente-b3.js\n  ", error);
      throw error;
    } finally {
      __LAST_PAK_RESULT__ = Pak.modules["01. Simple test/mod-b/componente-b3.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[8] = 01. Simple test/mod-b.js
  (function(module) {
    try {
      Pak.require("01. Simple test/mod-b/componente-b1.html");
      Pak.require("01. Simple test/mod-b/componente-b2.html");
      Pak.require("01. Simple test/mod-b/componente-b3.html");
    } catch (error) {
      console.log("⛔️ Error on module 01. Simple test/mod-b.js\n  ", error);
      throw error;
    } finally {
      __LAST_PAK_RESULT__ = Pak.modules["01. Simple test/mod-b.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[9] = 01. Simple test/index.js
  (function(module) {
    try {
      const a = Pak.require("01. Simple test/mod-a.js");
      const b = Pak.require("01. Simple test/mod-b.js");

      module.exports
    } catch (error) {
      console.log("⛔️ Error on module 01. Simple test/index.js\n  ", error);
      throw error;
    } finally {
      __LAST_PAK_RESULT__ = Pak.modules["01. Simple test/index.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[10] = 02. Drivers test/modules/first.js
  (function(module) {
    try {
      module.exports = 1;
    } catch (error) {
      console.log("⛔️ Error on module 02. Drivers test/modules/first.js\n  ", error);
      throw error;
    } finally {
      __LAST_PAK_RESULT__ = Pak.modules["02. Drivers test/modules/first.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[11] = 02. Drivers test/modules/second.js
  (function(module) {
    try {
      module.exports = 2;

    } catch (error) {
      console.log("⛔️ Error on module 02. Drivers test/modules/second.js\n  ", error);
      throw error;
    } finally {
      __LAST_PAK_RESULT__ = Pak.modules["02. Drivers test/modules/second.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[12] = 02. Drivers test/modules/third.js
  (function(module) {
    try {
      module.exports = 3;

    } catch (error) {
      console.log("⛔️ Error on module 02. Drivers test/modules/third.js\n  ", error);
      throw error;
    } finally {
      __LAST_PAK_RESULT__ = Pak.modules["02. Drivers test/modules/third.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[13] = 02. Drivers test/index.js
  (function(module) {
    try {
      const first = Pak.require("02. Drivers test/modules/first.js");
      const second = Pak.require("02. Drivers test/modules/second.js");
      const third = Pak.require("02. Drivers test/modules/third.js");

      Pak.assert(first === 1, "First should be 1");
      Pak.assert(second === 2, "Second should be 2");
      Pak.assert(third === 3, "Third should be 3");

      const first2 = Pak.require("drivers-test/first");
      const second2 = Pak.require("drivers-test/second");
      const third2 = Pak.require("drivers-test/modules/third.js");

      Pak.assert(first === first2, "First should be 1 like first2");
      Pak.assert(second === second2, "Second should be 2 like second2");
      Pak.assert(third === third2, "Third should be 3 like third2");
    } catch (error) {
      console.log("⛔️ Error on module 02. Drivers test/index.js\n  ", error);
      throw error;
    } finally {
      __LAST_PAK_RESULT__ = Pak.modules["02. Drivers test/index.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[14] = 03. Evaluator test/index.js
  (function(module) {
    try {
      // Ya viene importado del test.js:
      // require(__dirname + "/../pak-compiler.dist.js");

      (async function main() {

        const mod78 = await PakCompiler.global.run("03. Evaluator test/mod78.js");

        PakCompiler.assert(78 === mod78, "Module mod78 should be 78");

      })();
    } catch (error) {
      console.log("⛔️ Error on module 03. Evaluator test/index.js\n  ", error);
      throw error;
    } finally {
      __LAST_PAK_RESULT__ = Pak.modules["03. Evaluator test/index.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[15] = 04. Environment dependant modules test/index.js
  (function(module) {
    try {
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
        const [cli, gui, server, nodejs, browser] = outputs;
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
    } catch (error) {
      console.log("⛔️ Error on module 04. Environment dependant modules test/index.js\n  ", error);
      throw error;
    } finally {
      __LAST_PAK_RESULT__ = Pak.modules["04. Environment dependant modules test/index.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[16] = 05. Command line interface/index.js
  (function(module) {
    try {
      (async function main() {
        const fs = require("fs");
        const timers = require("timers");
        const child_process = require("child_process");
        const read = file => fs.promises.readFile(file, "utf8");
        const write = (file, content) => fs.promises.writeFile(file, content, "utf8");
        const assert = PakCompiler.assert;
        try {
          await fs.promises.rm(`${__dirname}/05. Command line interface/nowatch`, {
            recursive: true
          });
        } catch (error) {
          // @OK because it should not exist already
        }
        // await timers.promises.setTimeout(200);
        await fs.promises.mkdir(`${__dirname}/05. Command line interface/nowatch`);
        await fs.promises.mkdir(`${__dirname}/05. Command line interface/nowatch/example-1`);
        await fs.promises.mkdir(`${__dirname}/05. Command line interface/nowatch/example-2`);
        await fs.promises.mkdir(`${__dirname}/05. Command line interface/nowatch/example-3`);
        child_process.execSync(`pak init`, {
          cwd: `${__dirname}/05. Command line interface/nowatch/example-1`,
          stdio: "inherit"
        });
        child_process.execSync(`pak init`, {
          cwd: `${__dirname}/05. Command line interface/nowatch/example-2`,
          stdio: "inherit"
        });
        child_process.execSync(`pak init`, {
          cwd: `${__dirname}/05. Command line interface/nowatch/example-3`,
          stdio: "inherit"
        });
        await fs.promises.mkdir(`${__dirname}/05. Command line interface/nowatch/example-3/pak_modules/projects/default`);
        await write(`${__dirname}/05. Command line interface/nowatch/example-3/hello.txt`, "");
        await write(`${__dirname}/05. Command line interface/nowatch/example-3/pak_modules/projects/default/main.js`, "require('fs').writeFileSync(__dirname + '/hello.txt', 'hello from example 3', 'utf8');", "utf8");
        child_process.execSync(`pak run`, {
          cwd: `${__dirname}/05. Command line interface/nowatch/example-3`,
          stdio: "inherit"
        });
        PakCompiler.assert("hello from example 3" === await read(`${__dirname}/05. Command line interface/nowatch/example-3/pak_modules/dist/default/hello.txt`), "File hello.txt should be fulfilled adecuately");
        await fs.promises.rm(`${__dirname}/05. Command line interface/nowatch`, {
          recursive: true
        });
      })();
    } catch (error) {
      console.log("⛔️ Error on module 05. Command line interface/index.js\n  ", error);
      throw error;
    } finally {
      __LAST_PAK_RESULT__ = Pak.modules["05. Command line interface/index.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[17] = build.js
  (function(module) {
    try {
      Pak.require("01. Simple test/index.js");
      Pak.require("02. Drivers test/index.js");
      Pak.require("03. Evaluator test/index.js");
      Pak.require("04. Environment dependant modules test/index.js");
      Pak.require("05. Command line interface/index.js");
    } catch (error) {
      console.log("⛔️ Error on module build.js\n  ", error);
      throw error;
    } finally {
      __LAST_PAK_RESULT__ = Pak.modules["build.js"] = module.exports;
    }
  })({
    exports: undefined
  });

  if (typeof module !== "undefined") module.exports = __LAST_PAK_RESULT__;

  return __LAST_PAK_RESULT__;

})(typeof Pak !== "undefined" ? Pak : false)