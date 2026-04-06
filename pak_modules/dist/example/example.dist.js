// @pak-module:
// - Source generated:
//    - date:         Mon Apr 06 2026 17:20:35 GMT+0200 (hora de verano de Europa central)
//    - time:         0.019 seconds
//    - modules:      3
//       - 0. Pak.require("src/maths/addition.js")
//       - 1. Pak.require("src/hello.js")
//       - 2. Pak.require("projects/example/main.js")
//    - styles:       0
//    - templates:    0
// @module[main] = Pak
(function(PreviousPak) {
  //////////////////////////////////////////////////////////////////////////////
  const Pak = Object.create(typeof PreviousPak === "object" ? PreviousPak : {
    assert: (condition, message) => {
      if (!condition) throw new Error(message)
    },
    modules: {},
    drivers: {
      "math-addition": "src/maths/addition.js"
    },
    driversByKeys: false,
    resolveDriver: function(id) {
      if (!this.driversByKeys) {
        this.driversByKeys = Object.keys(this.drivers);
      }
      for (let index = 0; index < this.driversByKeys.length; index++) {
        const key = this.driversByKeys[index];
        if (id.startsWith(key)) {
          return id.replace(key, this.drivers[key]);
        }
      }
      return id;
    },
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
  });
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
      Pak.modules["src/maths/addition.js"] = module.exports;
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
      Pak.modules["src/hello.js"] = module.exports;
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
      Pak.modules["projects/example/main.js"] = module.exports;
    }
  })({
    exports: undefined
  });

})(typeof Pak !== "undefined" ? Pak : false)