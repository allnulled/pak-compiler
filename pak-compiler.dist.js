(function (factory) {
  const mod = factory();
  if (typeof window !== "undefined") {
    window["PakCompiler"] = mod;
  }
  if (typeof global !== "undefined") {
    global["PakCompiler"] = mod;
  }
  if (typeof module !== "undefined") {
    module.exports = mod;
  }
})(function () {

  // Si estás en node.js, carga seguro el beautifier de js:
  if (typeof global !== "undefined") {
    global.beautifier = require(__dirname + "/pak_modules/lib/code-formatter/js-beautify.js");
  }

  const PakCompiler = class {

    static create(...args) {
      return new this(...args);
    }

    static ModuleDescriptor = class {
      static for(...args) {
        return new this(...args);
      }
      constructor(spec) {
        PakCompiler.trace("PakCompiler.constructor");
        PakCompiler.assert(typeof spec === "object", "Parameter «spec» must be object on «PakCompiler.ModuleDescriptor.constructor»");
        PakCompiler.assert(Object.keys(spec).length === 2, "Parameter «spec» must have 2 properties on «PakCompiler.ModuleDescriptor.constructor»");
        PakCompiler.assert(typeof spec.source === "string", "Parameter «spec.source» must be string on «PakCompiler.ModuleDescriptor.constructor»");
        PakCompiler.assert(typeof spec.exports === "undefined", "Parameter «spec.exports» must be undefined on «PakCompiler.ModuleDescriptor.constructor»");
        Object.assign(this, spec);
      }
    }

    // @DEV: debería ser false por defecto:
    static isTracing = true;

    static trace(method) {
      if (!this.isTracing) {
        return;
      }
      console.log(`[pak] [trace] ${method}`);
    }

    static env = class {
      static isNodejs = typeof global !== "undefined" && typeof require !== "undefined";
      static isBrowser = typeof window !== "undefined";
    };

    static assert(condition, message) {
      PakCompiler.trace("PakCompiler.prototype.assert");
      if (!condition) throw new Error(message);
    }

    constructor(basedir = ".") {
      PakCompiler.trace("PakCompiler.prototype.constructor");
      this.basedir = basedir;
      this.modules = {};
    }

    setBasedir(basedir) {
      PakCompiler.trace("PakCompiler.prototype.setBasedir");
      this.basedir = basedir;
      return this;
    }

    getRelativePath(...subpaths) {
      PakCompiler.trace("PakCompiler.prototype.getRelativePath");
      return require("path").resolve(this.basedir, ...subpaths);
    }

    $resolveEntry(file, entry = "main") {
      PakCompiler.trace("PakCompiler.prototype.$resolveEntry");
      return file.replace(/\!\{ *entry *\}/g, entry);
    }
    
    // método seguro: devuelve String o Error
    fetchResource(resourceBrute, modulesCache = this.modules, entry = "main") {
      PakCompiler.trace("PakCompiler.prototype.fetchResource");
      const resource = this.$resolveEntry(resourceBrute, entry);
      PakCompiler.trace("[fetching] " + resource);
      if (resource in modulesCache) {
        return modulesCache[resource];
      }
      if (PakCompiler.env.isNodejs) {
        const fullpath = require("path").resolve(this.basedir, resource);
        try {
          return require("fs").promises.readFile(fullpath, "utf8");
        } catch (error) {
          return error;
        }
      }
      if (PakCompiler.env.isBrowser) {
        const fullpath = resource.startsWith("http") ? resource : this.basedir + "/" + resource;
        return fetch(fullpath).then(res => {
          if (!res.ok) throw new Error(`Failed to fetch ${fullpath}`);
          return res.text();
        }).catch(error => {
          return error;
        });
      }
    }

    static symbols = {
      $REGEX_FOR_REQUIRES: /([A-Za-z_$][A-Za-z0-9_$]*\.)?require\(([^\)]*)\)/g,
      $REGEX_FOR_DRIVERS: /__PAK_DRIVERS__/g,
      $REGEX_FOR_ENTRY: /__PAK_ENTRY_ID__/g,
    };

    $resolveDriver(id, driversJson) {
      PakCompiler.trace("PakCompiler.prototype.$resolveDriver");
      for (let driver in driversJson) {
        if (id.startsWith(driver)) {
          return id.replace(driver, driversJson[driver]);
        }
      }
      return id;
    }

    $getExplicitDependenciesFromSource(source, driversJson, modulerBruteFilter = "") {
      PakCompiler.trace("PakCompiler.prototype.$getExplicitDependenciesFromSource");
      const dependencies = [];
      Iterating_matches:
      for (const match of source.matchAll(this.constructor.symbols.$REGEX_FOR_REQUIRES)) {
        const [text, modulerBrute, dependency] = match;
        if (modulerBrute === (modulerBruteFilter + ".")) {
          const moduler = modulerBrute.substr(0, modulerBrute.length - 1);
          const originalId = JSON.parse(dependency);
          const id = this.$resolveDriver(originalId, driversJson);
          dependencies.push(id);
        }
      }
      return dependencies;
    }

    $writeJsModuleFor(id, source, driversJson, modulesCache, pakInstanceId = "Pak", sortedJsModules = []) {
      PakCompiler.trace("PakCompiler.prototype.$writeJsModuleFor");
      return [
        `// @module[${sortedJsModules.length}] = ${id}`,
        `(function (module) {`,
        `  try {`,
        `    ${source}`,
        `  } catch(error) {`,
        `    console.log("⛔️ Error on module ${id}\\n  ", error);`,
        `    throw error;`,
        `  } finally {`,
        `    __LAST_PAK_RESULT__ = ${pakInstanceId}.modules[${JSON.stringify(id)}] = module.exports;`,
        `  }`,
        `})({ exports: undefined });\n`,
      ].join("\n");
    }

    $writeCssModuleFor(id, source, driversJson, modulesCache, pakInstanceId = "Pak", sortedJsModules = [], sortedCssModules = []) {
      PakCompiler.trace("PakCompiler.prototype.$writeCssModuleFor");
      return [
        `/* @css.module[${sortedCssModules.length}] = ${id} */`,
        source,
        ``,
      ].join("\n");
    }

    $writeJsHeader(sortedJsModules, sortedCssModules, sortedHtmlModules, duration, pakInstanceId) {
      PakCompiler.trace("PakCompiler.prototype.$writeJsHeader");
      return [
        `// @pak-module:`,
        `// - Source generated:`,
        `//    - date:         ${new Date()}`,
        `//    - time:         ${duration} seconds`,
        `//    - modules:      ${sortedJsModules.length}`,
        ...sortedJsModules.map((m, i) => `//       - ${i}. ${pakInstanceId}.require(${JSON.stringify(m)})`),
        `//    - styles:       ${sortedCssModules.length}`,
        ...sortedCssModules.map((m, i) => `//       - ${i}. ${pakInstanceId}.require(${JSON.stringify(m)})`),
        `//    - templates:    ${sortedHtmlModules.length}`,
        ...sortedHtmlModules.map((m, i) => `//       - ${i}. ${pakInstanceId}.require(${JSON.stringify(m)})`),
        ``,
      ].join("\n");
    }

    async $writePakCompilerSource() {
      PakCompiler.trace("PakCompiler.prototype.$writePakCompilerSource");
      return require("fs").promises.readFile(__filename, "utf8");
    }

    async $writeJsPakSource(source, drivers, entry = "main") {
      PakCompiler.trace("PakCompiler.prototype.$writeJsPakSource");
      return [
        `// @module[main] = Pak`,
        `(function(globalPak) {`,
        (
         "//////////////////////////////////////////////////////////////////////////////\n"+
         "let __LAST_PAK_RESULT__ = undefined;\n"+
         "const Pak = {\n"+
         "  // API de Pak Asserter: 1/3\n"+
         "  assert: (condition, message) => {\n"+
         "    if(!condition) {\n"+
         "      throw new Error(message);\n"+
         "    }\n"+
         "  },\n"+
         "  // API de Pak Modules: 2/3\n"+
         "  entry: __PAK_ENTRY_ID__,\n"+
         "  modules: typeof globalPak === \"object\" ? Object.create(globalPak.modules) : {},\n"+
         "  require: function (originalId) {\n"+
         "    const id = Pak.resolveDriver(originalId);\n"+
         "    if (id.endsWith(\".css\")) {\n"+
         "      return undefined;\n"+
         "    }\n"+
         "    if (id.endsWith(\".html\")) {\n"+
         "      return undefined;\n"+
         "    }\n"+
         "    if (!(id in Pak.modules)) {\n"+
         "      throw new Error(\"Module not found «\" + id + \"» on «Pak.require»\");\n"+
         "    }\n"+
         "    return Pak.modules[id];\n"+
         "  },\n"+
         "  // API de Pak Drivers: 3/3\n"+
         "  drivers: __PAK_DRIVERS__,\n"+
         "  driverIds: false,\n"+
         "  resolveDriver: function(id) {\n"+
         "    if(!this.driverIds) {\n"+
         "      this.driverIds = Object.keys(this.drivers).sort((a,b) => {\n"+
         "        return a.length > b.length ? -1 : a.length < b.length ? 1 : 0;\n"+
         "      });\n"+
         "    }\n"+
         "    for(let index=0; index<this.driverIds.length; index++) {\n"+
         "      const key = this.driverIds[index];\n"+
         "      if(id.startsWith(key)) {\n"+
         "        return id.replace(key, this.drivers[key]);\n"+
         "      }\n"+
         "    }\n"+
         "    return id;\n"+
         "  },\n"+
         "};\n"+
         "// Exporta Pak si no hay ya uno:\n"+
         "if (typeof window !== \"undefined\" && typeof window.Pak === \"undefined\") window.Pak = Pak;\n"+
         "if (typeof global !== \"undefined\" && typeof global.Pak === \"undefined\") global.Pak = Pak;\n"+
         "//////////////////////////////////////////////////////////////////////////////\n"
        ).replace(this.constructor.symbols.$REGEX_FOR_DRIVERS, JSON.stringify(drivers, null, 2))
          .replace(this.constructor.symbols.$REGEX_FOR_ENTRY, JSON.stringify(entry)),
        source,
        (
         "if(typeof module !== \"undefined\") module.exports = __LAST_PAK_RESULT__;\n"+
         "\n"+
         "return __LAST_PAK_RESULT__;\n"
        ),
        `})(typeof Pak !== "undefined" ? Pak : false)`,
      ].join("\n");
    }

    async $buildJs(...args) {
      PakCompiler.trace("PakCompiler.prototype.$buildJs");
      const [
        file,
        driversJson = {},
        modulesCache = {},
        pakInstanceId = "Pak",
        sortedJsModules = [],
        sortedCssModules = [],
        sortedHtmlModules = [],
        entry = "main"
      ] = args;
      let source = await this.fetchResource(file, modulesCache, entry);
      let js = "";
      let css = "";
      const dependencies = this.$getExplicitDependenciesFromSource(source, driversJson, pakInstanceId, entry);
      modulesCache[file] = PakCompiler.ModuleDescriptor.for({ source, exports: undefined });
      for (let indexDependency = 0; indexDependency < dependencies.length; indexDependency++) {
        const dependencyId = dependencies[indexDependency];
        Conditional_caching:
        if (!(dependencyId in modulesCache)) {
          // @ok: entry task
          const [moreJs, moreCss] = await this.$buildAny(dependencyId, driversJson, modulesCache, pakInstanceId, sortedJsModules, sortedCssModules, sortedHtmlModules, entry);
          js += moreJs;
          css += moreCss;
        }
      }
      sortedJsModules.push(file);
      js += this.$writeJsModuleFor(file, source, driversJson, modulesCache, pakInstanceId, sortedJsModules, sortedCssModules);
      return [js, css];
    }

    async $buildCss(...args) {
      PakCompiler.trace("PakCompiler.prototype.$buildCss");
      const [
        file,
        driversJson = {},
        modulesCache = {},
        pakInstanceId = "Pak",
        sortedJsModules = [],
        sortedCssModules = [],
        sortedHtmlModules = [],
        entry = "main",
      ] = args;
      let source = await this.fetchResource(file, modulesCache, entry);
      let js = "";
      let css = "";
      const dependencies = this.$getExplicitDependenciesFromSource(source, driversJson, pakInstanceId, entry);
      modulesCache[file] = PakCompiler.ModuleDescriptor.for({ source, exports: undefined });
      for (let indexDependency = 0; indexDependency < dependencies.length; indexDependency++) {
        const dependencyId = dependencies[indexDependency];
        Conditional_caching:
        if (!(dependencyId in modulesCache)) {
          const [moreJs, moreCss] = await this.$buildAny(dependencyId, driversJson, modulesCache, pakInstanceId, sortedJsModules, sortedCssModules, sortedHtmlModules, entry);
          js += moreJs;
          css += moreCss;
        }
      }
      sortedCssModules.push(file);
      css += this.$writeCssModuleFor(file, source, driversJson, modulesCache, pakInstanceId, sortedJsModules, sortedCssModules);
      return [js, css];
    }

    async $buildHtml(...args) {
      PakCompiler.trace("PakCompiler.prototype.$buildHtml");
      const [
        file,
        driversJson = {},
        modulesCache = {},
        pakInstanceId = "Pak",
        sortedJsModules = [],
        sortedCssModules = [],
        sortedHtmlModules = [],
        entry = "main",
      ] = args;
      const text = await this.fetchResource(file, modulesCache, entry);
      sortedHtmlModules.push(file);
      return text;
    }

    async $buildAny(...args) {
      PakCompiler.trace("PakCompiler.prototype.$buildAny");
      const [
        file,
        driversJson = {},
        modulesCache = {},
        pakInstanceId = "Pak",
        sortedJsModules = [],
        sortedCssModules = [],
        sortedHtmlModules = [],
        entry = "main",
      ] = args;
      const fileExtension = file.split(".").pop();
      let html = "";
      let css = "";
      let js = "";
      if (fileExtension === "html") {
        const fileUnextended = file.replace(/\.html$/g, "");
        html += await this.$buildHtml(file, driversJson, modulesCache, pakInstanceId, sortedJsModules, sortedCssModules, sortedHtmlModules, entry);
        try {
          const [moreJs2, moreCss2] = await this.$buildCss(fileUnextended + ".css", driversJson, modulesCache, pakInstanceId, sortedJsModules, sortedCssModules, sortedHtmlModules, entry);
          css += moreCss2;
          js += moreJs2;
        } catch (error) {
          // @OK: css can fail
        }
        const [moreJs3, moreCss3] = await this.$buildJs(fileUnextended + ".js", driversJson, modulesCache, pakInstanceId, sortedJsModules, sortedCssModules, sortedHtmlModules, entry);
        css += moreCss3;
        js += moreJs3.replace("$template", JSON.stringify(html));
      } else if (fileExtension === "css") {
        const [moreJs2, moreCss2] = await this.$buildCss(file, driversJson, modulesCache, pakInstanceId, sortedJsModules, sortedCssModules, sortedHtmlModules, entry);
        css += moreCss2;
        js += moreJs2;
      } else if (fileExtension === "js") {
        const [moreJs, moreCss] = await this.$buildJs(file, driversJson, modulesCache, pakInstanceId, sortedJsModules, sortedCssModules, sortedHtmlModules, entry);
        css += moreCss;
        js += moreJs;
      } else if (fileExtension === "json") {
        js += await this.$buildJson(file, driversJson, modulesCache, pakInstanceId, sortedJsModules, sortedCssModules, sortedHtmlModules, entry);
      } else if (fileExtension === "png") {
        js += await this.$buildUnknownExtension(file, driversJson, modulesCache, pakInstanceId, sortedJsModules, sortedCssModules, sortedHtmlModules, entry);
      }
      return [js, css, sortedJsModules, sortedCssModules, sortedHtmlModules];
    }

    $getDrivers() {
      PakCompiler.trace("PakCompiler.prototype.$getDrivers");
      if (this.drivers) {
        return this.drivers;
      }
      return this.fetchResource(this.basedir + "/drivers.json").then((text) => {
        if(text instanceof Error) throw error;
        this.drivers = JSON.parse(text);
        return this.drivers;
      }).catch((error) => {
        if(error.message.startsWith("ENOENT:")) {
          console.log(`[!] Missing «drivers.json» for ${this.basedir} on «PakCompiler.prototype.$getDrivers»`);
          return {};
        }
        console.log(`[!!] Unknown error fetching «drivers.json» for ${this.basedir} on «PakCompiler.prototype.$getDrivers»`, error);
        return {};
      });
    }

    async build(file, options = {}) {
      const {
        modulesCache = {},
        settings = {},
        pakInstanceId = "Pak",
      } = options;
      PakCompiler.trace("PakCompiler.prototype.build");
      // @NOTICE: La primera entrada NO PUEDE TENER !{entry} porque él es el entry:
      const entry = file.replace(/\.js$/g, "").replace(/.*\//g, "");
      const start = new Date();
      const drivers = await this.$getDrivers();
      const [originalJs, originalCss, jsModules, cssModules, htmlModules] = await this.$buildAny(file, drivers, {}, pakInstanceId, [], [], [], entry);
      let js = originalJs;
      let css = originalCss;
      js = await this.$writeJsPakSource(js, drivers, entry) + "\n";
      if (typeof beautifier !== "undefined") {
        js = beautifier.js(js, { indent_size: 2 });
        css = beautifier.css(css, { indent_size: 2 });
      }
      const duration = ((new Date()) - start) / 1000;
      js = this.$writeJsHeader(jsModules, cssModules, htmlModules, duration, pakInstanceId) + "" + js;
      return { js, css, jsModules, cssModules, htmlModules, duration, start };
    }

    run(file, options = {}) {
      PakCompiler.trace("PakCompiler.prototype.run");
      return this.build(file, options).then(output => {
        return eval(output.js);
      });
    }

  };

  PakCompiler.global = PakCompiler.create();

  return PakCompiler;

});