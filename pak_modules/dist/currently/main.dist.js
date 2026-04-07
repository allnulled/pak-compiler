// @pak-module:
// - Source generated:
//    - date:         Tue Apr 07 2026 23:13:14 GMT+0200 (hora de verano de Europa central)
//    - time:         0.033 seconds
//    - modules:      7
//       - 0. Pak.require("src/filesystem/exists.js")
//       - 1. Pak.require("src/filesystem/read.js")
//       - 2. Pak.require("src/filesystem/write.js")
//       - 3. Pak.require("src/filesystem/all.js")
//       - 4. Pak.require("src/command-line/colors.js")
//       - 5. Pak.require("projects/runners/colors-test.js")
//       - 6. Pak.require("projects/currently/main.js")
//    - styles:       0
//    - templates:    0
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
    entry: "main",
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
      "math-addition": "src/maths/addition.js"
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

  // @module[1] = src/filesystem/exists.js
  (function(module) {
    try {
      module.exports = function(file) {
        throw new Error("To be done");
      }
    } catch (error) {
      console.log("⛔️ Error on module src/filesystem/exists.js\n  ", error);
      throw error;
    } finally {
      __LAST_PAK_RESULT__ = Pak.modules["src/filesystem/exists.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[2] = src/filesystem/read.js
  (function(module) {
    try {
      module.exports = function(file) {
        return require("fs").promises.readFile(file, "utf8");
      };
    } catch (error) {
      console.log("⛔️ Error on module src/filesystem/read.js\n  ", error);
      throw error;
    } finally {
      __LAST_PAK_RESULT__ = Pak.modules["src/filesystem/read.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[3] = src/filesystem/write.js
  (function(module) {
    try {
      module.exports = function(file, content) {
        return require("fs").promises.writeFile(file, content, "utf8");
      };
    } catch (error) {
      console.log("⛔️ Error on module src/filesystem/write.js\n  ", error);
      throw error;
    } finally {
      __LAST_PAK_RESULT__ = Pak.modules["src/filesystem/write.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[4] = src/filesystem/all.js
  (function(module) {
    try {
      module.exports = {
        exists: Pak.require("src/filesystem/exists.js"),
        read: Pak.require("src/filesystem/read.js"),
        write: Pak.require("src/filesystem/write.js"),
      }
    } catch (error) {
      console.log("⛔️ Error on module src/filesystem/all.js\n  ", error);
      throw error;
    } finally {
      __LAST_PAK_RESULT__ = Pak.modules["src/filesystem/all.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[5] = src/command-line/colors.js
  (function(module) {
    try {
      module.exports = {
        available: {

          // estilos
          bold: [1, 22],
          italic: [3, 23],
          underline: [4, 24],
          blink: [5, 25],
          inverse: [7, 27],
          strike: [9, 29],

          // colores
          black: [30, 39],
          red: [31, 39],
          green: [32, 39],
          yellow: [33, 39],
          blue: [34, 39],
          magenta: [35, 39],
          cyan: [36, 39],
          white: [37, 39],

          // fondo
          bgBlack: [40, 49],
          bgRed: [41, 49],
          bgGreen: [42, 49],
          bgYellow: [43, 49],
          bgBlue: [44, 49],
          bgMagenta: [45, 49],
          bgCyan: [46, 49],
          bgWhite: [47, 49],

          // brillantes
          blackBright: [90, 39],
          redBright: [91, 39],
          greenBright: [92, 39],
          yellowBright: [93, 39],
          blueBright: [94, 39],
          magentaBright: [95, 39],
          cyanBright: [96, 39],
          whiteBright: [97, 39],

          bgBlackBright: [100, 49],
          bgRedBright: [101, 49],
          bgGreenBright: [102, 49],
          bgYellowBright: [103, 49],
          bgBlueBright: [104, 49],
          bgMagentaBright: [105, 49],
          bgCyanBright: [106, 49],
          bgWhiteBright: [107, 49],

        },
        style: function(config = "red,bold,underline") {
          const styles = config.split(",");
          return {
            text: (text) => {
              const begin = styles.reduce((out, it) => {
                if (!(it in this.available)) {
                  return out;
                }
                const code = this.available[it];
                out += `\x1b[${code[0]}m`;
                return out;
              }, "");
              const end = "\x1b[0m";
              return `${begin}${text}${end}`;
            }
          }
        }
      };
    } catch (error) {
      console.log("⛔️ Error on module src/command-line/colors.js\n  ", error);
      throw error;
    } finally {
      __LAST_PAK_RESULT__ = Pak.modules["src/command-line/colors.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[6] = projects/runners/colors-test.js
  (function(module) {
    try {
      const fs = Pak.require("src/filesystem/all.js");
      const colors = Pak.require("src/command-line/colors.js");

      console.log(colors);

      console.log(colors.style("magenta").text("Ei, what is up") + colors.style("yellow").text(" but in colors") + colors.style("red").text("!!"));
    } catch (error) {
      console.log("⛔️ Error on module projects/runners/colors-test.js\n  ", error);
      throw error;
    } finally {
      __LAST_PAK_RESULT__ = Pak.modules["projects/runners/colors-test.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[7] = projects/currently/main.js
  (function(module) {
    try {
      module.exports = Pak.require("projects/runners/colors-test.js");
    } catch (error) {
      console.log("⛔️ Error on module projects/currently/main.js\n  ", error);
      throw error;
    } finally {
      __LAST_PAK_RESULT__ = Pak.modules["projects/currently/main.js"] = module.exports;
    }
  })({
    exports: undefined
  });

  if (typeof module !== "undefined") module.exports = __LAST_PAK_RESULT__;

  return __LAST_PAK_RESULT__;

})(typeof Pak !== "undefined" ? Pak : false)