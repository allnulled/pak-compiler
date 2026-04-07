# pak-compiler

Tipo webpack, rollup o browserify.

## Índice

- [pak-compiler](#pak-compiler)
  - [Índice](#índice)
  - [Instalar](#instalar)
  - [Interfaz de línea de comandos](#interfaz-de-línea-de-comandos)
  - [Uso](#uso)
  - [Instrucciones de lectura del documento](#instrucciones-de-lectura-del-documento)
  - [Contextualización](#contextualización)
    - [Evaluador opcional](#evaluador-opcional)
  - [Directorios](#directorios)
  - [Ficheros](#ficheros)
    - [Fichero configurable dev.sh](#fichero-configurable-devsh)
    - [Fichero configurable drivers.json](#fichero-configurable-driversjson)

## Instalar

```sh
git clone https://github.com/allnulled/pak-compiler.git .
npm install
npm link
```

Requiere [`refrescador`](https://github.com/allnulled/refrescador) en línea de comandos, que ahora mismo no está subido a `npm`.

## Interfaz de línea de comandos

En proceso, pero:

- El comando `pak` puedes instalarlo con `npm link`.
- Permite:
   - `pak init ${PATH=.}`
      - sirve para crear un proyecto desde cero
   - `pak compile ${PROJECT=default}`
      - `--file ${FILE=main.js}`
      - se basa en `@@/projects/${PROJECT}/${FILE}`
      - sirve para crear el `@@/dist/${PROJECT}/${FILE}.dist.js` y `~.css`.
   - `pak run ${PROJECT}`
      - `--file ${FILE=main.js}`
      - `--mode ${MODE=compile|eval}`
      - se basa en `@@/projects/${PROJECT}/${FILE}`
      - sirve para crear el `@@/dist/${PROJECT}/${FILE}.dist.js` y `~.css`.
      - y luego ejecutarlo:
         - sea con `require` el fichero
         - sea con `eval` el texto

## Uso

Se trata de personalizar el loop de desarrollo.

## Instrucciones de lectura del documento

- El `@@` significa el `basedir` del `PakCompiler` que por defecto es `pak_modules`:
- El `PakCompiler.prototype.setBasedir(basedir:String)` te permite cambiar este valor.
- Este valor solo existe en compilación, no en runtime.

## Contextualización

- Hay 2 contextos principales:
   - compilación:
      - cuando el código fuente está separado en módulos
      - solo está accesible `PakCompiler` y su `PakCompiler.global`.
   - runtime:
      - cuando el código fuente está unificado y ejecutándose
      - solo está accesible `Pak` y su `Pak.require("path/a/modulo.js")`.
      - puedes importar el `PakCompiler`, de esto trata la sección [Evaluador opcional](#evaluador-opcional).

### Evaluador opcional

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

## Directorios

- `@@/bin`: comandos accesibles desde `pak ${COMANDO}`.
- `@@/dist`: ficheros compilados separados por proyecto. **Solo lectura**.
- `@@/lib`: librerías de terceros que interesa compilar.
- `@@/projects`: distintas entradas de proyectos paralelos.
- `@@/src`: aquí desarrollas el código realmente.

## Ficheros

Si haces un `git clone` o un `pak init`, hay algunos ficheros que tienes que tener en cuenta:

### Fichero configurable dev.sh

- Inicia el **loop de desarrollo**.
- Es personalizable.
- Utiliza [refrescador](https://github.com/allnulled/refrescador)
- Si pones los pasos del *builder* con el `-x`, te cronometrará cada paso y el total

Ejemplo:

```bash
#!/usr/bin/bash

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

### Fichero configurable drivers.json

- Indica shortnames de rutas o ficheros
   - Siempre con preferencia por el alias más largo
- Es personalizable
- Es visible tanto en compilación como en runtime
   - Es un objeto alcanzable con `Pak.drivers` en runtime
   - Es un objeto alcanzable con `PakCompiler.prototype.$getDrivers()` en compilación
      - Aquí lo toma siempre de `@@/drivers.json`
      - Solo hay 1 `drivers.json` por instancia de `PakCompiler` (eso implica el `@@` que es el `basedir` de la instancia)



