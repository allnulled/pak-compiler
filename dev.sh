#!/usr/bin/bash

refrescador \
  -w . \
  -e "js" \
  -e "css" \
  -e "html" \
  -e "sh" \
  -e "json" \
  -i '**/dist/**' \
  -i '**/*.dist.*' \
  -i '**/*-dist.*' \
  -i '**/nowatch/**' \
  -i '**/*.nowatch.*' \
  -i '**/*-nowatch.*' \
  -x 'bash build-compiler.sh' \
  -x 'bash build.sh' \
