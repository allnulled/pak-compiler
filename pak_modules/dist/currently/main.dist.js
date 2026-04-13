// @pak-module:
// - Source generated:
//    - date:         Mon Apr 13 2026 23:04:27 GMT+0200 (hora de verano de Europa central)
//    - time:         0.026 seconds
//    - modules:      2
//       - 0. Pak.require("projects/currently/components/calendar/calendar.js")
//       - 1. Pak.require("projects/currently/main.js")
//    - styles:       1
//       - 0. Pak.require("projects/currently/components/calendar/calendar.css")
//    - templates:    1
//       - 0. Pak.require("projects/currently/components/calendar/calendar.html")
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
        return Pak.modules[id.replace(/\.html$/g, ".js")];
      }
      if (!(id in Pak.modules)) {
        throw new Error("Module not found «" + id + "» on «Pak.require»");
      }
      return Pak.modules[id];
    },
    // API de Pak Drivers: 3/3
    drivers: {
      "!{src}": "src"
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

  // @module[1] = projects/currently/components/calendar/calendar.js
  (function(module) {
    try {
      module.exports = {
        name: "whatever",
        template: "<div class=\"calendar\">\n    calendario\n</div>",
      };
    } catch (error) {
      console.log("⛔️ Error on module projects/currently/components/calendar/calendar.js\n  ", error);
      throw error;
    } finally {
      __LAST_PAK_RESULT__ = Pak.modules["projects/currently/components/calendar/calendar.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[2] = projects/currently/main.js
  (function(module) {
    try {
      const Calendar = Pak.require("projects/currently/components/calendar/calendar.html");

      console.log(Calendar);

      module.exports = 0;
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