// @pak-module:
// - Source generated:
//    - date:         Tue Apr 07 2026 02:34:18 GMT+0200 (hora de verano de Europa central)
//    - time:         0.018 seconds
//    - modules:      1
//       - 0. Pak.require("projects/example/dev.js")
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

  // @module[1] = projects/example/dev.js
  (function(module) {
    try {

    } catch (error) {
      console.log("⛔️ Error on module projects/example/dev.js\n  ", error);
      throw error;
    } finally {
      __LAST_PAK_RESULT__ = Pak.modules["projects/example/dev.js"] = module.exports;
    }
  })({
    exports: undefined
  });

  return __LAST_PAK_RESULT__;

})(typeof Pak !== "undefined" ? Pak : false)