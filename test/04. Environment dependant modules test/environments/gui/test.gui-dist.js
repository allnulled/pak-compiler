// @pak-module:
// - Source generated:
//    - date:         Tue Apr 07 2026 23:24:48 GMT+0200 (hora de verano de Europa central)
//    - time:         0.016 seconds
//    - modules:      2
//       - 0. Pak.require("04. Environment dependant modules test/environments/gui/module.js")
//       - 1. Pak.require("04. Environment dependant modules test/entries/gui.js")
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
    entry: "gui",
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

  // @module[1] = 04. Environment dependant modules test/environments/gui/module.js
  (function(module) {
    try {
      module.exports = "gui";
    } catch (error) {
      console.log("⛔️ Error on module 04. Environment dependant modules test/environments/gui/module.js\n  ", error);
      throw error;
    } finally {
      __LAST_PAK_RESULT__ = Pak.modules["04. Environment dependant modules test/environments/gui/module.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[2] = 04. Environment dependant modules test/entries/gui.js
  (function(module) {
    try {
      module.exports = Pak.require("04. Environment dependant modules test/environments/gui/module.js");
    } catch (error) {
      console.log("⛔️ Error on module 04. Environment dependant modules test/entries/gui.js\n  ", error);
      throw error;
    } finally {
      __LAST_PAK_RESULT__ = Pak.modules["04. Environment dependant modules test/entries/gui.js"] = module.exports;
    }
  })({
    exports: undefined
  });

  if (typeof module !== "undefined") module.exports = __LAST_PAK_RESULT__;

  return __LAST_PAK_RESULT__;

})(typeof Pak !== "undefined" ? Pak : false)