@echo off

rem *** Concatenates lib\main.js, lib\main.firefox.js and modules\*.js into lib\main.firefox.compiled.js ***

type lib\main.js > lib\main.firefox.compiled.js
echo. >> lib\main.firefox.compiled.js
type lib\main.firefox.js >> lib\main.firefox.compiled.js
for %%i in (modules\*.js) do echo. >> lib\main.firefox.compiled.js & type %%i >> lib\main.firefox.compiled.js