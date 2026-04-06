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
