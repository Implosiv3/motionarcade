@echo off

set /p VERSION=<VERSION
set LIBRARY=motionarcade
set IMAGE_NAME=%LIBRARY%:%VERSION%

echo Version detected (from VERSION file): %VERSION%

:: Remove previous container if existing
:: docker rm -f "%IMAGE_NAME%" 2>nul

docker compose up -d