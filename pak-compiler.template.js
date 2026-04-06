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
      this.basedir = basedir;
      return this;
    }
    
    // método seguro: devuelve String o Error
    $fetchResource(resource, modulesCache = this.modules) {
      PakCompiler.trace("PakCompiler.prototype.$fetchResource");
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
        `    ${pakInstanceId}.modules[${JSON.stringify(id)}] = module.exports;`,
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

    async $writeJsPakSource(source, drivers) {
      PakCompiler.trace("PakCompiler.prototype.$writeJsPakSource");
      return [
        `// @module[main] = Pak`,
        `(function(PreviousPak) {`,
        __PAK_SNIPPET__.OpaquePak.replace(this.constructor.symbols.$REGEX_FOR_DRIVERS, JSON.stringify(drivers, null, 2)),
        source,
        `})(typeof Pak !== "undefined" ? Pak : false)`,
      ].join("\n");
    }

    async $buildJs(...args) {
      const [
        file,
        driversJson = {},
        modulesCache = {},
        pakInstanceId = "Pak",
        sortedJsModules = [],
        sortedCssModules = [],
        sortedHtmlModules = [],
        htmlTemplate = false
      ] = args;
      PakCompiler.trace("PakCompiler.prototype.$buildJs");
      let source = await this.$fetchResource(file, modulesCache);
      let js = "";
      let css = "";
      const dependencies = this.$getExplicitDependenciesFromSource(source, driversJson, pakInstanceId);
      modulesCache[file] = PakCompiler.ModuleDescriptor.for({ source, exports: undefined });
      for (let indexDependency = 0; indexDependency < dependencies.length; indexDependency++) {
        const dependencyId = dependencies[indexDependency];
        Conditional_caching:
        if (!(dependencyId in modulesCache)) {
          const [moreJs, moreCss] = await this.$buildAny(dependencyId, driversJson, modulesCache, pakInstanceId, sortedJsModules, sortedCssModules);
          js += moreJs;
          css += moreCss;
        }
      }
      sortedJsModules.push(file);
      js += this.$writeJsModuleFor(file, source, driversJson, modulesCache, pakInstanceId, sortedJsModules, sortedCssModules);
      return [js, css];
    }

    async $buildCss(...args) {
      const [
        file,
        driversJson = {},
        modulesCache = {},
        pakInstanceId = "Pak",
        sortedJsModules = [],
        sortedCssModules = [],
        sortedHtmlModules = [],
        htmlTemplate = false,
        canFail = false
      ] = args;
      PakCompiler.trace("PakCompiler.prototype.$buildCss");
      let source = await this.$fetchResource(file, modulesCache);
      let js = "";
      let css = "";
      const dependencies = this.$getExplicitDependenciesFromSource(source, driversJson, pakInstanceId);
      modulesCache[file] = PakCompiler.ModuleDescriptor.for({ source, exports: undefined });
      for (let indexDependency = 0; indexDependency < dependencies.length; indexDependency++) {
        const dependencyId = dependencies[indexDependency];
        Conditional_caching:
        if (!(dependencyId in modulesCache)) {
          const [moreJs, moreCss] = await this.$buildAny(dependencyId, driversJson, modulesCache, pakInstanceId, sortedJsModules, sortedCssModules);
          js += moreJs;
          css += moreCss;
        }
      }
      sortedCssModules.push(file);
      css += this.$writeCssModuleFor(file, source, driversJson, modulesCache, pakInstanceId, sortedJsModules, sortedCssModules);
      return [js, css];
    }

    async $buildHtml(...args) {
      const [
        file,
        driversJson = {},
        modulesCache = {},
        pakInstanceId = "Pak",
        sortedJsModules = [],
        sortedCssModules = [],
        sortedHtmlModules = [],
      ] = args;
      PakCompiler.trace("PakCompiler.prototype.$buildHtml");
      const text = await this.$fetchResource(file, modulesCache);
      sortedHtmlModules.push(file);
      return text;
    }

    async $buildAny(...args) {
      const [
        file,
        driversJson = {},
        modulesCache = {},
        pakInstanceId = "Pak",
        sortedJsModules = [],
        sortedCssModules = [],
        sortedHtmlModules = []
      ] = args;
      PakCompiler.trace("PakCompiler.prototype.$build");
      const fileExtension = file.split(".").pop();
      let html = "";
      let css = "";
      let js = "";
      if (fileExtension === "html") {
        const fileUnextended = file.replace(/\.html$/g, "");
        html += await this.$buildHtml(file, driversJson, modulesCache, pakInstanceId, sortedJsModules, sortedCssModules, sortedHtmlModules);
        try {
          const [moreJs2, moreCss2] = await this.$buildCss(fileUnextended + ".css", driversJson, modulesCache, pakInstanceId, sortedJsModules, sortedCssModules, sortedHtmlModules, html, true);
          css += moreCss2;
          js += moreJs2;
        } catch (error) {
          // @OK: css can fail
        }
        const [moreJs3, moreCss3] = await this.$buildJs(fileUnextended + ".js", driversJson, modulesCache, pakInstanceId, sortedJsModules, sortedCssModules, html);
        css += moreCss3;
        js += moreJs3.replace("$template", JSON.stringify(html));
      } else if (fileExtension === "css") {
        const [moreJs2, moreCss2] = await this.$buildCss(file, driversJson, modulesCache, pakInstanceId, sortedJsModules, sortedCssModules);
        css += moreCss2;
        js += moreJs2;
      } else if (fileExtension === "js") {
        const [moreJs, moreCss] = await this.$buildJs(file, driversJson, modulesCache, pakInstanceId, sortedJsModules, sortedCssModules);
        css += moreCss;
        js += moreJs;
      } else if (fileExtension === "json") {
        js += await this.$buildJson(file, driversJson, modulesCache, pakInstanceId, sortedJsModules, sortedCssModules);
      } else if (fileExtension === "png") {
        js += await this.$buildUnknownExtension(file, driversJson, modulesCache, pakInstanceId, sortedJsModules, sortedCssModules);
      }
      return [js, css, sortedJsModules, sortedCssModules, sortedHtmlModules];
    }

    $resolveAlias(id, drivers = {}) {
      PakCompiler.trace("PakCompiler.prototype.$resolveAlias");
      if (!drivers.alias) {
        return id;
      }
      for (const alias in drivers.alias) {
        if (id.startsWith(alias)) {
          return id.replace(alias, drivers.alias[alias]);
        }
      }
      return id;
    }

    $getDrivers() {
      if (this.drivers) {
        return this.drivers;
      }
      return this.$fetchResource(this.basedir + "/drivers.json").then((text) => {
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
      const start = new Date();
      const drivers = await this.$getDrivers();
      const [originalJs, originalCss, jsModules, cssModules, htmlModules] = await this.$buildAny(file, drivers, {}, pakInstanceId);
      let js = originalJs;
      let css = originalCss;
      js = await this.$writeJsPakSource(js, drivers) + "\n";
      if (typeof beautifier !== "undefined") {
        js = beautifier.js(js, { indent_size: 2 });
        css = beautifier.css(css, { indent_size: 2 });
      }
      const duration = ((new Date()) - start) / 1000;
      js = this.$writeJsHeader(jsModules, cssModules, htmlModules, duration, pakInstanceId) + "" + js;
      return { js, css, jsModules, cssModules, htmlModules, duration, start };
    }

  };

  PakCompiler.global = PakCompiler.create();

  return PakCompiler;

});