#!/usr/bin/bash

refrescador \
  -w . \
  -e "js" \
  -i 'dist.js' \
  -i 'test/test.dist.js' \
  -i 'test/test.dist.css' \
  -i 'pak_modules/dist.js' \
  -i 'pak_modules/dist.css' \
  -i 'pak-compiler.dist.js' \
  -x 'bash dev.payload.sh'