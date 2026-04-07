// @pak-module:
// - Source generated:
//    - date:         Tue Apr 07 2026 03:41:34 GMT+0200 (hora de verano de Europa central)
//    - time:         0.02 seconds
//    - modules:      3
//       - 0. Pak.require("src/maths/addition.js")
//       - 1. Pak.require("src/hello.js")
//       - 2. Pak.require("projects/example/main.js")
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

  // @module[1] = src/maths/addition.js
  (function(module) {
    try {
      module.exports = function(...args) {
        let out = 0;
        for (let index = 0; index < args.length; index++) {
          const arg = args[index];
          out += arg;
        }
        return out;
      }
    } catch (error) {
      console.log("⛔️ Error on module src/maths/addition.js\n  ", error);
      throw error;
    } finally {
      __LAST_PAK_RESULT__ = Pak.modules["src/maths/addition.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[2] = src/hello.js
  (function(module) {
    try {
      module.exports = function(user) {
        console.log("Hello " + user);
        console.log(`Here it is: ${ Pak.require("math-addition")(5,10,15) }`)
      };
    } catch (error) {
      console.log("⛔️ Error on module src/hello.js\n  ", error);
      throw error;
    } finally {
      __LAST_PAK_RESULT__ = Pak.modules["src/hello.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[3] = projects/example/main.js
  (function(module) {
    try {
      const hello = Pak.require("src/hello.js");

      hello("user!");
    } catch (error) {
      console.log("⛔️ Error on module projects/example/main.js\n  ", error);
      throw error;
    } finally {
      __LAST_PAK_RESULT__ = Pak.modules["projects/example/main.js"] = module.exports;
    }
  })({
    exports: undefined
  });

  return __LAST_PAK_RESULT__;

})(typeof Pak !== "undefined" ? Pak : false)