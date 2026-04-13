# Build del compiler: (quitar cuando esté estabilizado el desarrollo)
echo "[process] compiling compiler"
node src/builder-for/pak-compiler.js

# Tests del compiler: (quitar cuando esté estabilizado el desarrollo)
echo "[process] testing compiler with node test/test.js"
node test/test.js