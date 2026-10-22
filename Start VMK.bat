@echo off
title VMK
cd /d "%~dp0"

rem A release carries its own Node in node\; a dev checkout uses the installed one.
set "NODE=%~dp0node\node.exe"
if not exist "%NODE%" (
  where node >nul 2>nul
  if errorlevel 1 (
    echo.
    echo   VMK needs Node.js 22.5 or newer, and none was found.
    echo   Get it from https://nodejs.org/ and run this again.
    echo.
    pause
    exit /b 1
  )
  set "NODE=node"
)

"%NODE%" start.mjs %*
if errorlevel 1 (
  echo.
  pause
)
