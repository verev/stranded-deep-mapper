set FILES= code/settings.js code/island-graph.js code/util-canvas.js code/renderer.js code/controller.js

cat %FILES% >tmp/code.cat.js
uglifyjs tmp/code.cat.js -mo html/code.min.js
