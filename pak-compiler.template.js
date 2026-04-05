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
    global.beautifier = require(__dirname + "/pak_modules/libraries/code-formatter/js-beautify.js");
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
      console.log(`[pak][trace] ${method}`);
    }

    static env = class {
      static isNodejs = typeof global !== "undefined" && typeof require !== "undefined";
      static isBrowser = typeof global !== "undefined" && typeof require !== "undefined";
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

    $fetchResource(resource, modulesCache = this.modules) {
      PakCompiler.trace("PakCompiler.prototype.$fetchResource");
      console.log("Fetching: " + resource);
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
        // @Yo: Chatgpt, me puedes ayudar aquí?
      }
    }

    static symbols = {
      $REGEX_FOR_REQUIRES: /([A-Za-z_$][A-Za-z0-9_$]*\.)?require\(([^\)]*)\)/g,
    };

    $getExplicitDependenciesFromSource(source, modulerBruteFilter = "") {
      PakCompiler.trace("PakCompiler.prototype.$getExplicitDependenciesFromSource");
      const dependencies = [];
      Iterating_matches:
      for (const match of source.matchAll(this.constructor.symbols.$REGEX_FOR_REQUIRES)) {
        const [text, modulerBrute, dependency] = match;
        if(modulerBrute === (modulerBruteFilter + ".")) {
          const moduler = modulerBrute.substr(0, modulerBrute.length - 1);
          const id = JSON.parse(dependency);
          dependencies.push(id);
        }
      }
      return dependencies;
    }

    $writeJsModuleFor(id, source, modulesCache, pakInstanceId = "Pak", sortedJsModules = []) {
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

    $writeCssModuleFor(id, source, modulesCache, pakInstanceId = "Pak", sortedJsModules = [], sortedCssModules = []) {
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

    async $writeJsPakSource(source) {
      PakCompiler.trace("PakCompiler.prototype.$writeJsPakSource");
      return [
        `// @module[main] = Pak`,
        `(function(PreviousPak) {`,
        __PAK_SNIPPET__.OpaquePak,
        source,
        `})(typeof Pak !== "undefined" ? Pak : false)`,
      ].join("\n");
    }

    async $buildJs(file, modulesCache = {}, pakInstanceId = "Pak", sortedJsModules = [], sortedCssModules = [], sortedHtmlModules = [], htmlTemplate = false) {
      PakCompiler.trace("PakCompiler.prototype.$buildJs");
      let source = await this.$fetchResource(file, modulesCache);
      let js = "";
      let css = "";
      const dependencies = this.$getExplicitDependenciesFromSource(source, pakInstanceId);
      modulesCache[file] = PakCompiler.ModuleDescriptor.for({ source, exports: undefined });
      for (let indexDependency = 0; indexDependency < dependencies.length; indexDependency++) {
        const dependencyId = dependencies[indexDependency];
        Conditional_caching:
        if (!(dependencyId in modulesCache)) {
          const [moreJs, moreCss] = await this.$build(dependencyId, modulesCache, pakInstanceId, sortedJsModules, sortedCssModules);
          js += moreJs;
          css += moreCss;
        }
      }
      sortedJsModules.push(file);
      js += this.$writeJsModuleFor(file, source, modulesCache, pakInstanceId, sortedJsModules, sortedCssModules);
      return [js, css];
    }

    async $buildCss(file, modulesCache = {}, pakInstanceId = "Pak", sortedJsModules = [], sortedCssModules = [], sortedHtmlModules = [], htmlTemplate = false, canFail = false) {
      PakCompiler.trace("PakCompiler.prototype.$buildCss");
      let source = await this.$fetchResource(file, modulesCache);
      let js = "";
      let css = "";
      const dependencies = this.$getExplicitDependenciesFromSource(source, pakInstanceId);
      modulesCache[file] = PakCompiler.ModuleDescriptor.for({ source, exports: undefined });
      for (let indexDependency = 0; indexDependency < dependencies.length; indexDependency++) {
        const dependencyId = dependencies[indexDependency];
        Conditional_caching:
        if (!(dependencyId in modulesCache)) {
          const [moreJs, moreCss] = await this.$build(dependencyId, modulesCache, pakInstanceId, sortedJsModules, sortedCssModules);
          js += moreJs;
          css += moreCss;
        }
      }
      sortedCssModules.push(file);
      css += this.$writeCssModuleFor(file, source, modulesCache, pakInstanceId, sortedJsModules, sortedCssModules);
      return [js, css];
    }

    async $buildHtml(file, modulesCache, pakInstanceId, sortedJsModules, sortedCssModules, sortedHtmlModules) {
      PakCompiler.trace("PakCompiler.prototype.$buildHtml");
      const text = await this.$fetchResource(file, modulesCache);
      sortedHtmlModules.push(file);
      return text;
    }

    async $build(file, modulesCache = {}, pakInstanceId = "Pak", sortedJsModules = [], sortedCssModules = [], sortedHtmlModules = []) {
      PakCompiler.trace("PakCompiler.prototype.$build");
      const fileExtension = file.split(".").pop();
      let html = "";
      let css = "";
      let js = "";
      if (fileExtension === "html") {
        const fileUnextended = file.replace(/\.html$/g, "");
        html += await this.$buildHtml(file, modulesCache, pakInstanceId, sortedJsModules, sortedCssModules, sortedHtmlModules);
        try {
          const [moreJs2, moreCss2] = await this.$buildCss(fileUnextended + ".css", modulesCache, pakInstanceId, sortedJsModules, sortedCssModules, sortedHtmlModules, html, true);
          css += moreCss2;
          js += moreJs2;
        } catch (error) {
          // @OK: css can fail
        }
        const [moreJs3, moreCss3] = await this.$buildJs(fileUnextended + ".js", modulesCache, pakInstanceId, sortedJsModules, sortedCssModules, html);
        css += moreCss3;
        js += moreJs3.replace("$template", JSON.stringify(html));
      } else if (fileExtension === "css") {
        const [moreJs2, moreCss2] = await this.$buildCss(file, modulesCache, pakInstanceId, sortedJsModules, sortedCssModules);
        css += moreCss2;
        js += moreJs2;
      } else if (fileExtension === "js") {
        const [moreJs, moreCss] = await this.$buildJs(file, modulesCache, pakInstanceId, sortedJsModules, sortedCssModules);
        css += moreCss;
        js += moreJs;
      } else if (fileExtension === "json") {
        js += await this.$buildJson(file, modulesCache, pakInstanceId, sortedJsModules, sortedCssModules);
      } else if (fileExtension === "png") {
        js += await this.$buildUnknownExtension(file, modulesCache, pakInstanceId, sortedJsModules, sortedCssModules);
      }
      return [js, css, sortedJsModules, sortedCssModules, sortedHtmlModules];
    }

    async build(file, modulesCache = {}, settings = {}, pakInstanceId = "Pak") {
      PakCompiler.trace("PakCompiler.prototype.build");
      const start = new Date();
      const [originalJs, originalCss, jsModules, cssModules, htmlModules] = await this.$build(file, modulesCache, pakInstanceId);
      let js = originalJs;
      let css = originalCss;
      js = await this.$writeJsPakSource(js) + "\n";
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