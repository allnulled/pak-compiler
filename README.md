# pak-compiler

Tipo webpack, rollup o browserify.

## Índice

- [pak-compiler](#pak-compiler)
  - [Índice](#índice)
  - [Instrucciones](#instrucciones)
  - [Directorios](#directorios)
  - [Uso](#uso)
  - [Ficheros](#ficheros)

## Instrucciones

- El `@@` significa el `basedir` del `PakCompiler` que por defecto es `pak_modules`:

## Directorios

- `@@/bin`: comandos accesibles desde `pak ${COMANDO}`.
- `@@/dist`: ficheros compilados separados por proyecto. **Solo lectura**.
- `@@/lib`: librerías de terceros que interesa compilar.
- `@@/projects`: distintas entradas de proyectos paralelos.
- `@@/src`: aquí desarrollas el código realmente.

## Uso

Se trata de personalizar el loop de desarrollo.

Herramientas en proceso.

## Ficheros

- `dev.sh`:
   - solo lectura.
   - ejecútalo para iniciar el loop de desarrollo.
- `build.sh`: 
   - personalizable.
   - ejecútalo para reconstruir el código fuente
   - comando que se dispara en el loop de desarrollo
   - adecúalo a tu builder en cada caso
      - si tienes muchos puedes hacer `pak run --project ${PROYECTO} ${COMANDO}`
- `@@/drivers.json`:
   - personalizable.
   - contiene las abreviaciones de los módulos.
   - este objeto existe tanto en *compilation* como en *runtime*.
   - es un json que contiene shortnames para módulos o rutas de módulo.
   - la única norma es que:
      - el selector tiene que empezar por el id del driver
      - el driver cambia esa subruta siempre
      - tampoco sirven los '..'
   - sirve para:
      - no tener que escribir todo el path del módulo siempre
      - poder cambiar de APIs que hacen lo mismo fácil

