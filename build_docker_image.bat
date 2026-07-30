@echo off

set /p VERSION=<VERSION
set LIBRARY=motionarcade
set IMAGE_NAME=%LIBRARY%:%VERSION%
set IMAGE_NAME_LATEST=%LIBRARY%:latest

echo Version detected (from VERSION file): %VERSION%

:: Execute this command to rebuild if new dependencies
docker build --no-cache --build-arg VERSION=%VERSION% -t %IMAGE_NAME% -t %IMAGE_NAME_LATEST% .
:: Execute this command to rebuild if NO new dependencies
:: docker build --build-arg VERSION=%VERSION% -t %IMAGE_NAME% -t %IMAGE_NAME_LATEST% .