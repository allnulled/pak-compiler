# Build del compiler: (quitar cuando esté estabilizado el desarrollo)
echo "[step 1] compiling compiler"
node src/builder-for/pak-compiler.js

# Tests del compiler: (quitar cuando esté estabilizado el desarrollo)
echo "[step 2] testing compiler with node test/test.js"
node test/test.js

# Usa «exit 1» para errores:
exit 0

# Build de aplicación: (personaliza en cada caso)
echo "[step 3] building example"
node pak_modules/bin/build.js example

# Ejecución de la aplicación:
echo "[step 4] running example"
node pak_modules/bin/run.js example