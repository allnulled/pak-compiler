// @pak-module:
// - Source generated:
//    - date:         Mon Apr 06 2026 10:55:08 GMT+0200 (hora de verano de Europa central)
//    - time:         0.013 seconds
//    - modules:      1
//       - 0. Pak.require("application/main.js")
//    - styles:       0
//    - templates:    0
// @module[main] = Pak
(function(PreviousPak) {
  const Pak = Object.create(typeof PreviousPak === "object" ? PreviousPak : {
    assert: (condition, message) => {
      if (!condition) throw new Error(message)
    },
    modules: {},
    require: function(id) {
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
  // @module[1] = application/main.js
  (function(module) {
    try {
      console.log("Main!");
    } catch (error) {
      console.log("⛔️ Error on module application/main.js\n  ", error);
      throw error;
    } finally {
      Pak.modules["application/main.js"] = module.exports;
    }
  })({
    exports: undefined
  });

})(typeof Pak !== "undefined" ? Pak : false)