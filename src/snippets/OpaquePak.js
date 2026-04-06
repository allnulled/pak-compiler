//////////////////////////////////////////////////////////////////////////////
const Pak = Object.create(typeof PreviousPak === "object" ? PreviousPak : {
  assert: (condition, message) => { if(!condition) throw new Error(message) },
  modules: {},
  drivers: __PAK_DRIVERS__,
  driversByKeys: false,
  resolveDriver: function(id) {
    if(!this.driversByKeys) {
      this.driversByKeys = Object.keys(this.drivers);
    }
    for(let index=0; index<this.driversByKeys.length; index++) {
      const key = this.driversByKeys[index];
      if(id.startsWith(key)) {
        return id.replace(key, this.drivers[key]);
      }
    }
    return id;
  },
  require: function (originalId) {
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