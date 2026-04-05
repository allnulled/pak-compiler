const Pak = Object.create(typeof PreviousPak === "object" ? PreviousPak : {
  assert: (condition, message) => { if(!condition) throw new Error(message) },
  modules: {},
  require: function (id) {
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