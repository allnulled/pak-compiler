# pak-compiler

Tipo webpack, rollup o browserify.

## Empaquetar código

La idea principal es que en tu pipeline de *builder* del código js y css pongas:

```js
require("pak-compiler.js");

const {
    js,          // código js compilado
    css,         // código css compilado
    jsModules,   // módulos js por orden
    cssModules,  // módulos css por orden
    htmlModules, // módulos html por orden
    duration,    // duración de compilación
    start,       // inicio de compilación
} = await PakCompiler.global.build("entry/to/your/app.js");

require("fs").writeFileSync("dist.js", js, "utf8");
require("fs").writeFileSync("dist.css", css, "utf8");
```

El compilador no necesita node.js porque se limita a entregar 1 string basándose:

  - o en ficheros (node.js)
  - o en urls (browser)

El compilador se encarga mediante **expresiones regulares** de captar en los ficheros **js y css**:

- `Pak.require("texto")`

Lo entiende como módulos, y los va apendizando en el fuente final en orden de demanda.

En principio no hay que preocuparse de nada más.

## Exportar módulos

Tanto en browser como en node.js:

```js
module.exports = function() {
    // los módulos no tienen mediación, son tal cual los defines
}
```

## Importar módulos

Cuando requieres un fichero así, es importado como dependencia:

```js
const value = Pak.require("path/to/anywhere"); // no concat, no variables, solo 1 string
```

Tiene que ser:

- 1 string **de dobles comitas** `"string aquí"` del tirón
- ni concats ni variables ni templates
- no puede contener `)` bajo ningún concepto
- dentro de los `(` y `)` tiene que haber un string en JSON bien formado
   - valen `\\"` pero `)` interrumpe la regexp

Nótese la sincronicidad, no hay `await` porque en runtime, aquí ya habrá cargado la dependencia.

## Tipos de módulos

Hay varios tipos de módulos según la extensión final:

- Módulos `*.html`:
   - busca un `mismo-nombre.css` opcionalmente
   - busca un `mismo-nombre.js` opcionalmente
      - se le reemplazará la primera aparición de `$template` por el html en formato string
      - el fichero `.js` es libre de inyectar la plantilla como le parezca
- Módulos `*.css`:
   - solo apendiza en el css
- Módulos `*.js`:
   - solo apendiza en el js
- Módulos `*.json`:
   - solo apendiza en el js
- Otras extensiones:
   - solo apendiza en el js el nombre relativo del módulo
      - no el contenido por si son recursos multimedia o así
   - puedes usarlo para guardar la referencia, y usarlo como un string en el código
   - puede que se inyecte un $template igual que con módulos html, pero más adelante, ahora no lo hace

## Importar librerías externas

Puedes hacerlo normal, simplemente la pones al alcance y haces:

```js
Pak.require("third-party/jquery.js");
```

Y ya está, tienes jquery. Ahora, hay que tener en cuenta que:

> Se está inyectando automáticamente `module` en el scope (local, no global, pero ningún script que empaquetas se ejecuta en global) del browser.

Si eso interfiere en la lógica de librerías de terceros, ahí ya, a saber.


## Características

- Importación y exportación compatible con node.js (tal cual) o browser (con sintaxis)
- Importación recursiva basada en RegExp para sniffear módulos dependientes
- Soporte para css
- Soporte para js
- Soporte para json
- Soporte para html
   - Como plantilla inyectable en el js

## ¿Por qué no import/export?

Bueno, hay diferencias. Personalmente, para controlar todo el flujo, tanto de compilación como de evaluación dinámica de código. No es que no vaya bien, pero si me tengo que pelear con mil cosas por 4 funciones que me quitan a cambio de una sintaxis bonita, pues pasa esto.

No tiene dependencias, sabes? No pierde el tiempo intentando comprender todo el JS para sacar dónde exactamente está sucediendo un import.

Hace prá, regexp y fuera. Malas praxis que no se podrían generalizar, o que darían muchos conflictos.

Tengo muchos repositorios, pero no aprovecho el código, y deshecho proyectos donde llevo muchas funciones acumuladas.

Y me doy cuenta que la clave son las funciones, esto es para hacer 1 banco de funciones propias.

Con esto espero poder escalar mejor los proyectos.