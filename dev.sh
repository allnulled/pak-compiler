#!/usr/bin/bash

refrescador \
  -w . \
  -e "js" \
  -i '**/dist/**' \
  -i '**/*.dist.*' \
  -i '**/*-dist.*' \
  -i '**/nowatch/**' \
  -i '**/*.nowatch.*' \
  -i '**/*-nowatch.*' \
  -x 'bash build.sh' \
