// @pak-module:
// - Source generated:
//    - date:         Sun Apr 05 2026 12:55:09 GMT+0200 (hora de verano de Europa central)
//    - time:         0.034 seconds
//    - modules:      14
//       - 0. Pak.require("test/01. Simple test/mod-a/mod-a1.js")
//       - 1. Pak.require("test/01. Simple test/mod-a/mod-a2.js")
//       - 2. Pak.require("test/01. Simple test/mod-a/mod-a3.js")
//       - 3. Pak.require("test/01. Simple test/mod-a.js")
//       - 4. Pak.require("test/01. Simple test/mod-b/componente-b1.js")
//       - 5. Pak.require("test/01. Simple test/mod-b/componente-b2.js")
//       - 6. Pak.require("test/01. Simple test/mod-b/componente-b3.js")
//       - 7. Pak.require("test/01. Simple test/mod-b.js")
//       - 8. Pak.require("test/01. Simple test/index.js")
//       - 9. Pak.require("test/02. Drivers test/modules/first.js")
//       - 10. Pak.require("test/02. Drivers test/modules/second.js")
//       - 11. Pak.require("test/02. Drivers test/modules/third.js")
//       - 12. Pak.require("test/02. Drivers test/index.js")
//       - 13. Pak.require("test/paker.js")
//    - styles:       4
//       - 0. Pak.require("test/01. Simple test/mod-a/styles-a.css")
//       - 1. Pak.require("test/01. Simple test/mod-a/styles-a1.css")
//       - 2. Pak.require("test/01. Simple test/mod-a/styles-a2.css")
//       - 3. Pak.require("test/01. Simple test/mod-a/styles-a3.css")
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
  // @module[1] = test/01. Simple test/mod-a/mod-a1.js
  (function(module) {
    try {
      Pak.require("test/01. Simple test/mod-a/styles-a1.css");
    } catch (error) {
      console.log("⛔️ Error on module test/01. Simple test/mod-a/mod-a1.js\n  ", error);
      throw error;
    } finally {
      Pak.modules["test/01. Simple test/mod-a/mod-a1.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[2] = test/01. Simple test/mod-a/mod-a2.js
  (function(module) {
    try {
      Pak.require("test/01. Simple test/mod-a/styles-a2.css");

    } catch (error) {
      console.log("⛔️ Error on module test/01. Simple test/mod-a/mod-a2.js\n  ", error);
      throw error;
    } finally {
      Pak.modules["test/01. Simple test/mod-a/mod-a2.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[3] = test/01. Simple test/mod-a/mod-a3.js
  (function(module) {
    try {
      Pak.require("test/01. Simple test/mod-a/styles-a3.css");

    } catch (error) {
      console.log("⛔️ Error on module test/01. Simple test/mod-a/mod-a3.js\n  ", error);
      throw error;
    } finally {
      Pak.modules["test/01. Simple test/mod-a/mod-a3.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[4] = test/01. Simple test/mod-a.js
  (function(module) {
    try {
      const a1 = Pak.require("test/01. Simple test/mod-a/mod-a1.js");
      const a2 = Pak.require("test/01. Simple test/mod-a/mod-a2.js");
      const a3 = Pak.require("test/01. Simple test/mod-a/mod-a3.js");


    } catch (error) {
      console.log("⛔️ Error on module test/01. Simple test/mod-a.js\n  ", error);
      throw error;
    } finally {
      Pak.modules["test/01. Simple test/mod-a.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[5] = test/01. Simple test/mod-b/componente-b1.js
  (function(module) {
    try {
      module.exports = {
        name: "whatever",
        template: "TEMPLATE DE B1.html"
      };
    } catch (error) {
      console.log("⛔️ Error on module test/01. Simple test/mod-b/componente-b1.js\n  ", error);
      throw error;
    } finally {
      Pak.modules["test/01. Simple test/mod-b/componente-b1.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[6] = test/01. Simple test/mod-b/componente-b2.js
  (function(module) {
    try {

    } catch (error) {
      console.log("⛔️ Error on module test/01. Simple test/mod-b/componente-b2.js\n  ", error);
      throw error;
    } finally {
      Pak.modules["test/01. Simple test/mod-b/componente-b2.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[7] = test/01. Simple test/mod-b/componente-b3.js
  (function(module) {
    try {

    } catch (error) {
      console.log("⛔️ Error on module test/01. Simple test/mod-b/componente-b3.js\n  ", error);
      throw error;
    } finally {
      Pak.modules["test/01. Simple test/mod-b/componente-b3.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[8] = test/01. Simple test/mod-b.js
  (function(module) {
    try {
      Pak.require("test/01. Simple test/mod-b/componente-b1.html");
      Pak.require("test/01. Simple test/mod-b/componente-b2.html");
      Pak.require("test/01. Simple test/mod-b/componente-b3.html");
    } catch (error) {
      console.log("⛔️ Error on module test/01. Simple test/mod-b.js\n  ", error);
      throw error;
    } finally {
      Pak.modules["test/01. Simple test/mod-b.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[9] = test/01. Simple test/index.js
  (function(module) {
    try {
      const a = Pak.require("test/01. Simple test/mod-a.js");
      const b = Pak.require("test/01. Simple test/mod-b.js");

      module.exports
    } catch (error) {
      console.log("⛔️ Error on module test/01. Simple test/index.js\n  ", error);
      throw error;
    } finally {
      Pak.modules["test/01. Simple test/index.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[10] = test/02. Drivers test/modules/first.js
  (function(module) {
    try {
      module.exports = 1;
    } catch (error) {
      console.log("⛔️ Error on module test/02. Drivers test/modules/first.js\n  ", error);
      throw error;
    } finally {
      Pak.modules["test/02. Drivers test/modules/first.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[11] = test/02. Drivers test/modules/second.js
  (function(module) {
    try {
      module.exports = 2;

    } catch (error) {
      console.log("⛔️ Error on module test/02. Drivers test/modules/second.js\n  ", error);
      throw error;
    } finally {
      Pak.modules["test/02. Drivers test/modules/second.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[12] = test/02. Drivers test/modules/third.js
  (function(module) {
    try {
      module.exports = 3;

    } catch (error) {
      console.log("⛔️ Error on module test/02. Drivers test/modules/third.js\n  ", error);
      throw error;
    } finally {
      Pak.modules["test/02. Drivers test/modules/third.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[13] = test/02. Drivers test/index.js
  (function(module) {
    try {
      const first = Pak.require("test/02. Drivers test/modules/first.js");
      const second = Pak.require("test/02. Drivers test/modules/second.js");
      const third = Pak.require("test/02. Drivers test/modules/third.js");

      Pak.assert(first === 1, "First should be 1");
      Pak.assert(second === 2, "Second should be 2");
      Pak.assert(third === 3, "Third should be 3");
    } catch (error) {
      console.log("⛔️ Error on module test/02. Drivers test/index.js\n  ", error);
      throw error;
    } finally {
      Pak.modules["test/02. Drivers test/index.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[14] = test/paker.js
  (function(module) {
    try {
      Pak.require("test/01. Simple test/index.js");
      Pak.require("test/02. Drivers test/index.js");
    } catch (error) {
      console.log("⛔️ Error on module test/paker.js\n  ", error);
      throw error;
    } finally {
      Pak.modules["test/paker.js"] = module.exports;
    }
  })({
    exports: undefined
  });

})(typeof Pak !== "undefined" ? Pak : false)