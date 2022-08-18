#!/bin/bash
rm -rv dist/${1:default}*
inject=" "
format="iife"
ext="js"
if [ -e "src/${1:-default}/prefix.js" ] ; then
	inject="--inject:src/${1:-default}/prefix.js"
fi
if [ -e "src/${1:-default}/index.mjs" ] ; then
	format="esm"
	ext="mjs"
fi
esbuild --bundle src/${1:-default}/index.${ext} $inject --format=$format --outfile=dist/${1:-default}.${ext} ${2:---minify-whitespace --minify-syntax --sourcemap --watch}
#cat proxy/${1:-default}.js
exit
