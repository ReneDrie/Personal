:: Created by npm, please don't edit manually.
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\node_modules\typescript\bin\tsc" %*
) ELSE (
  node  "%~dp0\node_modules\typescript\bin\tsc" %*
)