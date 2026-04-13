# pak-compiler

Empaquetar javascript de browser o nodejs estilo node todo con algunas features extra.

![build](https://img.shields.io/badge/tests-passing-brightgreen) 

![https://github.com/allnulled/pak-compiler/blob/main/pak.logo2.png](https://github.com/allnulled/pak-compiler/blob/main/pak.logo2.png)

## Índice

- [pak-compiler](#pak-compiler)
  - [Índice](#índice)
  - [Instalar](#instalar)
  - [Uso](#uso)
    - [Exportar un módulo](#exportar-un-módulo)
    - [Importar módulo](#importar-módulo)
  - [Interfaz de línea de comandos](#interfaz-de-línea-de-comandos)
  - [Explicaciones](#explicaciones)
    - [Instrucciones de lectura del documento](#instrucciones-de-lectura-del-documento)
    - [Contextualización](#contextualización)
      - [Evaluador opcional](#evaluador-opcional)
    - [Directorios](#directorios)
    - [Ficheros](#ficheros)
      - [Fichero configurable dev.sh](#fichero-configurable-devsh)
      - [Fichero configurable drivers.json](#fichero-configurable-driversjson)
      - [Modulación según entrada](#modulación-según-entrada)
      - [Fuera de pak\_modules](#fuera-de-pak_modules)
  - [Tests](#tests)
  - [Flujos](#flujos)
    - [Desactivar compilación del compilador pak y poner tu flujo](#desactivar-compilación-del-compilador-pak-y-poner-tu-flujo)
    - [Crear e importar un componente html](#crear-e-importar-un-componente-html)
    - [Herencia de estilos](#herencia-de-estilos)

## Instalar

```sh
git clone https://github.com/allnulled/pak-compiler.git .
npm install
npm link
```

Si no tienes [`refrescador`](https://github.com/allnulled/refrescador) en línea de comandos también necesitarías, **desde otra carpeta** ejecutar:

```sh
git clone https://github.com/allnulled/refrescador.git .
npm install
npm link
```

El `refrescador` se empalma en el fichero `dev.sh` que escucha cambios, y así puedes crear escuchadores y lanzar `pak` 

## Uso

Se trata de personalizar el loop de desarrollo con `refrescador` y `pak` para escuchar cambios + compilar + pasar tests.

En tanto que pak:

- personalizar el sistema de modulación en compilación o evaluación
- dotarlo de lo básico para funcionar en browser o nodejs igual

### Exportar un módulo

Bajo `PakCompiler.prototype.basedir` un fichero `modulo1.js` tanto en browser como en nodejs se escribe así:

```js
module.exports = function() {
   // Este módulo es una función
};
```

### Importar módulo

Bajo `PakCompiler.prototype.basedir` un fichero cualquiera como `main.js` puede importarlo así:

```js
const funcion = Pak.require("modulo1.js");
```

## Interfaz de línea de comandos

En proceso, pero:

- El comando `pak` puedes instalarlo con `npm link`.
- Permite:
   - `pak init ${PATH=.}`
      - sirve para crear un proyecto desde cero
   - `pak compile ${PROJECT=default}`
      - `--entry ${ENTRY=main.js}`
      - se basa en `@@/projects/${PROJECT}/${ENTRY}`
      - sirve para crear el `@@/dist/${PROJECT}/${ENTRY}.dist.js` y `~.css`.
   - `pak run ${PROJECT}`
      - `--entry ${ENTRY=main.js}`
      - `--mode ${MODE=compile|eval}`
      - se basa en `@@/projects/${PROJECT}/${ENTRY}`
      - sirve para crear el `@@/dist/${PROJECT}/${ENTRY}.dist.js` y `~.css`.
      - y luego ejecutarlo:
         - sea con `require` el fichero
         - sea con `eval` el texto
   - `pak list ?`: requieren `tree` en el `cmd`
      - `pak list projects` 
      - `pak list sources`
      - `pak list commands`
      - `pak list distribuibles`

## Explicaciones

A continuación se explica un poco cómo funciona por dentro `PakCompiler` (en compilación y opcionalmente en runtime) y `Pak` (en runtime).

### Instrucciones de lectura del documento

- El `@@` significa el `basedir` del `PakCompiler` que por defecto es `pak_modules`:
- El `PakCompiler.prototype.setBasedir(basedir:String)` te permite cambiar este valor.
- Este valor solo existe en compilación, no en runtime.

### Contextualización

- Hay 2 contextos principales:
   - compilación:
      - cuando el código fuente está separado en módulos
      - solo está accesible `PakCompiler` y su `PakCompiler.global`.
   - runtime:
      - cuando el código fuente está unificado y ejecutándose
      - solo está accesible `Pak` y su `Pak.require("path/a/modulo.js")`.
      - puedes importar el `PakCompiler`, de esto trata la sección [Evaluador opcional](#evaluador-opcional).

#### Evaluador opcional

- Opcionalmente, puedes compilar `pak-compiler.dist.js` dentro tu proyecto también
- Permite evaluar js modularmente en *runtime* tanto en node.js como en browser
- Lo permite `PakCompiler.prototype.run`
   - Acepta igual que `PakCompiler.prototype.build`
      - Porque por debajo lo llama
   - Devuelve una `Promise` con la evaluación del código compilado
      - Compilará recursivamente igual
      - Aplicando los drivers igual
      - Pero claro, usando AJAX y en serie, no en paralelo ni nada
- Se basará en AJAX en vez de sistema de ficheros
- Pero esto tiene algunas diferencias con la compilación o `PakCompiler.prototype.build`:
   - Los módulos no persisten en ficheros
   - Los módulos viven en memoria
   - Los módulos deberían ser eliminados por el Garbage Collector de JavaScript al terminar el comando y sus procesos
      - Pero no es tan fácil controlar el comportamiento del Garbage Collector, al menos desde JavaScript
      - Y puedes generar mucha información que:
         - se repita su evaluación en `runtime`
         - vincule al exterior y se convierta en un *memory leak* prácticamente irrastreable
         - interfiera con el código
      - Un `Pak` siempre se creará con su `Pak.modules.prototype` apuntando a un `Pak` padre, de haberlo
         - Esto significa que:
            - los únicos módulos que se quedan en memoria
            - más allá de la llamada `PakCompiler.prototype.run`
            - son los módulos del primer `Pak` que se crea
            - todos los otros se crearán como módulos de 1 clon y no del `Pak` padre
            - y el `Pak` accesible desde los módulos
            - nunca es el `Pak` padre
            - sino el clon
            - y al acabar las relaciones con las variables vivas de la memoria
            - es decir al acabar el comando que se lanza con `run` y todos sus vínculos con los datos vivos
            - este `Pak`, si se ha programado con cuidado, desaparecería por el Garbage Collector
            - y volvería a dejar el espacio de memoria libre
            - PERO
            - para esto hay que programar con cuidado y sabiendo qué se puede hacer y qué no
            - porque debugar este código es muy difícil
            - porque la evaluación en vivo no tiene tan buen reporte de errores
            - aunque ya procuro meterlo en try-catches
            - pero el problema ni siquiera termina ahí
            - porque ya no es el código
            - son los datos vivos y los datos recolectados
            - y debugar eso desde JavaScript se hace más complicado
            - aunque hay algunas cosas como:
               - `WeakSet` 
               - `WeakMap` 
               - `WeakRef` 
               - `FinalizationRegistry` 
            - pero son cosas que no he probado
            - y parecen muy reflectivas, así que bueno
- Pero existe la posibilidad de usar `PakCompiler` como evaluador
   - y en la API solo significa 1 método de 4 líneas dar soporte a esta *feature*
   - y en principio es segura, no es que sea experimental, usa `eval` pero está pensado para soportarlo
   - lo único es eso, que hay que tener mucho cuidado con los `memory leaks`
      - porque te pueden destruir la funcionalidad de la aplicación
      - y se hacen irrasterables si la aplicación empieza a hacerse grande
      - porque ni sabes de dónde viene ni tendrás forma de saberlo depende de cómo
      - pasa poco, pero cuando pasa, *hay que hacerse experto en V8 para saber por qué*

### Directorios

- `@@/bin`: comandos accesibles desde `pak ${COMANDO}`.
- `@@/dist`: ficheros compilados separados por proyecto. **Solo lectura**.
- `@@/lib`: librerías de terceros que interesa compilar.
- `@@/projects`: distintas entradas de proyectos paralelos.
- `@@/src`: aquí desarrollas el código realmente.

### Ficheros

Si haces un `git clone` o un `pak init`, hay algunos ficheros que tienes que tener en cuenta:

#### Fichero configurable dev.sh

- Inicia el **loop de desarrollo**.
- Es personalizable.
- Utiliza [refrescador](https://github.com/allnulled/refrescador)
- Si pones los pasos del *builder* con el `-x`, te cronometrará cada paso y el total

Ejemplo:

```bash
##!/usr/bin/bash

refrescador \
  -w . \
  -e "js" \
  -i '**/dist/**' \
  -i '**/*.dist.*' \
  -x 'node src/builder-for/pak-compiler.js' \
  -x 'node test/test.js' \
  -x 'node pak_modules/bin/build.js example' \
  -x 'node pak_modules/bin/run.js example' \
```

Personaliza los comandos `-x` para tener máximo control de tu *pipebuilder*.

#### Fichero configurable drivers.json

- Indica shortnames de rutas o ficheros
   - Siempre con preferencia por el alias más largo
- Es personalizable
- Es visible tanto en compilación como en runtime
   - Es un objeto alcanzable con `Pak.drivers` en runtime
   - Es un objeto alcanzable con `PakCompiler.prototype.$getDrivers()` en compilación
      - Aquí lo toma siempre de `@@/drivers.json`
      - Solo hay 1 `drivers.json` por instancia de `PakCompiler` (eso implica el `@@` que es el `basedir` de la instancia)

#### Modulación según entrada

- JavaScript soporta muchos entornos y aplicaciones objetivo, y puede que convivan en el mismo proyecto:
   - node.js
   - browser
   - gui con browser
   - gui con gtk u otros
   - aplicaciones de línea de comandos
   - aplicaciones de servidores
   - otras
- Cuando haces `Pak.require("mi/modulo.js")` puedes tener esta condición en cuenta:
   - Si haces `Pak.require("mi/!{entry}/modulo.js")` le estás diciendo:
      - *utiliza el **nombre del fichero de entrada de la compilación** como switcher de carpetas*
      - el nombre dentro de `@@/projects/{project}/{entry}.js`
      - por defecto, siempre debería ser `main.js` el fichero de entrada
         - pero puede haber más, y sirven para poder hacer estos switchers
- Para usarlo tienes que llamar al fichero de entrada de la compilación con el mismo nombre de la carpeta (o fichero) que quieras switchear según entorno
   - Esto significa que si tienes 7 entradas, tienes que hacer 7 procesos de compilación diferente
   - No hay otra forma de integrar condicionales en la lógica de carga en tiempo de compilación
      - El único switcher que se admite es el nombre del fichero de entrada
      - Esto facilitará la comprensión lectora de la compilación (tanto para Pak como para el desarrollador)
      - Esto también forzará que la compilación siga siempre 1 solo criterio por proyecto


#### Fuera de pak_modules

- El usar la carpeta de `pak_modules` es una recomendación, pero no es obligatorio
   - Si quieres ver un ejemplo de cómo no usar esta carpeta:
      - puedes ver los `test/test.js` donde no se utiliza esta carpeta
      - sino otra, la de `test` mismamente

## Tests

Los tests en [https://github.com/allnulled/pak-compiler/tree/main/test](https://github.com/allnulled/pak-compiler/tree/main/test) aclaran mucho más las features que se esperan de `PakCompiler API`, `Pak API` y `pak` para cmd.

## Flujos

A continuación se explican algunos flujos.

### Desactivar compilación del compilador pak y poner tu flujo

Por defecto se está compilando el compilador pak de `pak-compiler.template.js` a `pak-compiler.dist.js` cada vez que el `dev.sh` detecta cambios.

En `build.sh` puedes comentar las 2-3 líneas que construyen el compilador y pasan los tests.

```sh
node src/builder-for/pak-compiler.js
node test/test.js
exit 0 
```

### Crear e importar un componente html

Pak no obliga a ningún framework de vistas en html, solo importa el fichero html a texto en su homólogo fichero js.

- `componente-1.html`
- `componente-1.js`: aquí se inyecta el string del html en el primer `$template`
- `componente-1.css`: este se cargará automáticamente en la pila de css
   - recuerda que "soporta herencia", simplemente haces require de los css anteriores

Esto hace que puedas compatibilizar cualquier framework si te conformas con plantillas de texto plano inyectadas en ficheros js.

```html
<div class="mi-componente-1">
   <div>Componente 1</div>
</div>
```

En su homólogo js:

```js
module.exports = {
   name: "Componente1",
   template: $template,
   otherSettings: {},
};
```

Luego en el js puedes:

```js
const Componente1 = Pak.require("ruta/a/componente-1.html");
Componente1.name;
Componente1.template;
Componente1.otherSettings;
```

Y te quitas todo el tooling pesado de las típicas.

### Herencia de estilos

Pak soporta herencia de estilos css (por cada compilación) mediante su sistema de resolución de dependencias recursivo.

Solo tienes que inyectar mediante un comentario css:

```css
/* Pak.require("ruta/a/estilos/anteriores.css") */
```

Y el compilador ya se encargará de incluir antes esa hoja css.

Hay un test demostrándolo, el [06. Html and css modules test](https://github.com/allnulled/pak-compiler/blob/main/test/06.%20Html%20and%20css%20modules%20test).
