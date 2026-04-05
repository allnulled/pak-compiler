#!/usr/bin/bash

refrescador \
  -w . \
  -e "js" \
  -i 'dist.js' \
  -i 'test/test.dist.js' \
  -i 'test/test.dist.css' \
  -i 'pak-compiler.dist.js' \
  -x 'node src/builder-for/pak-compiler.js && node test/test.js'