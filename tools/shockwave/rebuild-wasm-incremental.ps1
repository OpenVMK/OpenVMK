$ErrorActionPreference = "Stop"
$Root = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$Libre = Join-Path $Root "tools\shockwave\LibreShockwave"
$Dist = Join-Path $Root "tools\shockwave\wasm\dist"
$Cmake = "C:\Program Files\CMake\bin\cmake.exe"

cmd /c "call $env:USERPROFILE\emsdk\emsdk_env.bat >nul 2>&1 && cd /d `"$Libre`" && `"$Cmake`" --build cmake-build-wasm --target libreshockwave_cpp_wasm_dist --parallel"
if ($LASTEXITCODE -ne 0) { throw "WASM build failed ($LASTEXITCODE)" }

$Built = Join-Path $Libre "cmake-build-wasm\cpp\wasm-dist"
Copy-Item -Path "$Built\*" -Destination $Dist -Recurse -Force
node (Join-Path $Root "tools\shockwave\apply-fetch-rewrite-patch.mjs")
node (Join-Path $Root "tools\shockwave\apply-fetch-log-patch.mjs")
Write-Host "WASM updated in $Dist"
