#!/usr/bin/bash

refrescador \
  -w . \
  -e "js" \
  -i '**/dist/**' \
  -i '**/*.dist.*' \
  -i '**/*-dist.*' \
  -x 'node src/builder-for/pak-compiler.js' \
  -x 'node test/test.js' \
#  -x 'node pak_modules/bin/cli.js run currently -f main' \
#  -x 'node pak_modules/bin/cli.js build example -f dev' \
#  -x 'node pak_modules/bin/cli.js run example -f dev' \
