// @pak-module:
// - Source generated:
//    - date:         Sun Apr 05 2026 03:07:20 GMT+0200 (hora de verano de Europa central)
//    - time:         0.029 seconds
//    - modules:      9
//       - 0. Pak.require("pak_modules/test/01. Simple test/mod-a/mod-a1.js")
//       - 1. Pak.require("pak_modules/test/01. Simple test/mod-a/mod-a2.js")
//       - 2. Pak.require("pak_modules/test/01. Simple test/mod-a/mod-a3.js")
//       - 3. Pak.require("pak_modules/test/01. Simple test/mod-a.js")
//       - 4. Pak.require("pak_modules/test/01. Simple test/mod-b/componente-b1.js")
//       - 5. Pak.require("pak_modules/test/01. Simple test/mod-b/componente-b2.js")
//       - 6. Pak.require("pak_modules/test/01. Simple test/mod-b/componente-b3.js")
//       - 7. Pak.require("pak_modules/test/01. Simple test/mod-b.js")
//       - 8. Pak.require("pak_modules/test/01. Simple test/index.js")
//    - styles:       4
//       - 0. Pak.require("pak_modules/test/01. Simple test/mod-a/styles-a.css")
//       - 1. Pak.require("pak_modules/test/01. Simple test/mod-a/styles-a1.css")
//       - 2. Pak.require("pak_modules/test/01. Simple test/mod-a/styles-a2.css")
//       - 3. Pak.require("pak_modules/test/01. Simple test/mod-a/styles-a3.css")
//    - templates:    0
// @module[main] = Pak
(function() {
  const Pak = Object.create(typeof Pak === "object" ? Pak : {
    modules: {},
    require: function(id) {
      if (!(id in Pak.modules)) {
        throw new Error("Module not found «" + id + "» on «Pak.require»");
      }
      return Pak.modules[id];
    },
  });
  if (typeof window !== "undefined" && typeof window.Pak === "undefined") window.Pak = Pak;
  if (typeof global !== "undefined" && typeof global.Pak === "undefined") global.Pak = Pak;
  // @module[1] = pak_modules/test/01. Simple test/mod-a/mod-a1.js
  (function(module) {
    try {
      Pak.require("pak_modules/test/01. Simple test/mod-a/styles-a1.css");
    } catch (error) {
      console.log("⛔️ Error on module pak_modules/test/01. Simple test/mod-a/mod-a1.js", error);
      throw error;
    } finally {
      Pak.modules["pak_modules/test/01. Simple test/mod-a/mod-a1.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[2] = pak_modules/test/01. Simple test/mod-a/mod-a2.js
  (function(module) {
    try {
      Pak.require("pak_modules/test/01. Simple test/mod-a/styles-a2.css");

    } catch (error) {
      console.log("⛔️ Error on module pak_modules/test/01. Simple test/mod-a/mod-a2.js", error);
      throw error;
    } finally {
      Pak.modules["pak_modules/test/01. Simple test/mod-a/mod-a2.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[3] = pak_modules/test/01. Simple test/mod-a/mod-a3.js
  (function(module) {
    try {
      Pak.require("pak_modules/test/01. Simple test/mod-a/styles-a3.css");

    } catch (error) {
      console.log("⛔️ Error on module pak_modules/test/01. Simple test/mod-a/mod-a3.js", error);
      throw error;
    } finally {
      Pak.modules["pak_modules/test/01. Simple test/mod-a/mod-a3.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[4] = pak_modules/test/01. Simple test/mod-a.js
  (function(module) {
    try {
      const a1 = Pak.require("pak_modules/test/01. Simple test/mod-a/mod-a1.js");
      const a2 = Pak.require("pak_modules/test/01. Simple test/mod-a/mod-a2.js");
      const a3 = Pak.require("pak_modules/test/01. Simple test/mod-a/mod-a3.js");


    } catch (error) {
      console.log("⛔️ Error on module pak_modules/test/01. Simple test/mod-a.js", error);
      throw error;
    } finally {
      Pak.modules["pak_modules/test/01. Simple test/mod-a.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[5] = pak_modules/test/01. Simple test/mod-b/componente-b1.js
  (function(module) {
    try {
      module.exports = {
        name: "whatever",
        template: "TEMPLATE DE B1.html"
      };
    } catch (error) {
      console.log("⛔️ Error on module pak_modules/test/01. Simple test/mod-b/componente-b1.js", error);
      throw error;
    } finally {
      Pak.modules["pak_modules/test/01. Simple test/mod-b/componente-b1.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[6] = pak_modules/test/01. Simple test/mod-b/componente-b2.js
  (function(module) {
    try {

    } catch (error) {
      console.log("⛔️ Error on module pak_modules/test/01. Simple test/mod-b/componente-b2.js", error);
      throw error;
    } finally {
      Pak.modules["pak_modules/test/01. Simple test/mod-b/componente-b2.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[7] = pak_modules/test/01. Simple test/mod-b/componente-b3.js
  (function(module) {
    try {

    } catch (error) {
      console.log("⛔️ Error on module pak_modules/test/01. Simple test/mod-b/componente-b3.js", error);
      throw error;
    } finally {
      Pak.modules["pak_modules/test/01. Simple test/mod-b/componente-b3.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[8] = pak_modules/test/01. Simple test/mod-b.js
  (function(module) {
    try {
      Pak.require("pak_modules/test/01. Simple test/mod-b/componente-b1.html");
      Pak.require("pak_modules/test/01. Simple test/mod-b/componente-b2.html");
      Pak.require("pak_modules/test/01. Simple test/mod-b/componente-b3.html");
    } catch (error) {
      console.log("⛔️ Error on module pak_modules/test/01. Simple test/mod-b.js", error);
      throw error;
    } finally {
      Pak.modules["pak_modules/test/01. Simple test/mod-b.js"] = module.exports;
    }
  })({
    exports: undefined
  });
  // @module[9] = pak_modules/test/01. Simple test/index.js
  (function(module) {
    try {
      const a = Pak.require("pak_modules/test/01. Simple test/mod-a.js");
      const b = Pak.require("pak_modules/test/01. Simple test/mod-b.js");


    } catch (error) {
      console.log("⛔️ Error on module pak_modules/test/01. Simple test/index.js", error);
      throw error;
    } finally {
      Pak.modules["pak_modules/test/01. Simple test/index.js"] = module.exports;
    }
  })({
    exports: undefined
  });

})()