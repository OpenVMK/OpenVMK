# Build native lingo export tool on Windows (VS 2022 Build Tools + CMake + Ninja).
$ErrorActionPreference = "Stop"

$Root = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$LibreDir = Join-Path $Root "tools\shockwave\LibreShockwave"
$Ninja = Join-Path $Root "tools\shockwave\bin\ninja.exe"
$Cmake = "C:\Program Files\CMake\bin\cmake.exe"
$BuildDir = Join-Path $LibreDir "cmake-build-native"
$Bin = Join-Path $BuildDir "cpp\libreshockwave_lingo_export.exe"
$Out = Join-Path $Root "docs\original-client-spec\lingo-export"
$Shockwave = if ($env:VMK_SHOCKWAVE) { $env:VMK_SHOCKWAVE } else { Join-Path $Root "shockwave" }

function Invoke-Vc([string]$Command) {
    $VsWhere = "${env:ProgramFiles(x86)}\Microsoft Visual Studio\Installer\vswhere.exe"
    if (-not (Test-Path $VsWhere)) { throw "vswhere not found; install VS Build Tools" }
    $VsRoot = & $VsWhere -latest -products * -requires Microsoft.VisualStudio.Component.VC.Tools.x86.x64 -property installationPath
    $VcVars = Join-Path $VsRoot "VC\Auxiliary\Build\vcvars64.bat"
    if (-not (Test-Path $VcVars)) { throw "vcvars64.bat not found at $VcVars" }
    $full = "call `"$VcVars`" >nul && $Command"
    cmd /c $full
    if ($LASTEXITCODE -ne 0) { throw "Command failed ($LASTEXITCODE): $Command" }
}

if (-not (Test-Path $Ninja)) {
    $NinjaBin = Split-Path $Ninja
    New-Item -ItemType Directory -Force -Path $NinjaBin | Out-Null
    $Zip = Join-Path $NinjaBin "ninja-win.zip"
    Invoke-WebRequest -Uri "https://github.com/ninja-build/ninja/releases/download/v1.13.2/ninja-win.zip" -OutFile $Zip -UseBasicParsing
    Expand-Archive -Path $Zip -DestinationPath $NinjaBin -Force
}

$ZlibRoot = Join-Path $Root "tools\shockwave\deps\zlib"
$ZlibBuild = Join-Path $Root "tools\shockwave\deps\zlib-build"
if (-not (Test-Path (Join-Path $ZlibRoot "zlib.h"))) {
    Write-Host "Downloading zlib..."
    New-Item -ItemType Directory -Force -Path $ZlibRoot | Out-Null
    $ZlibZip = Join-Path $ZlibRoot "zlib.zip"
    Invoke-WebRequest -Uri "https://github.com/madler/zlib/archive/refs/tags/v1.3.1.zip" -OutFile $ZlibZip -UseBasicParsing
    Expand-Archive -Path $ZlibZip -DestinationPath $ZlibRoot -Force
    Move-Item (Join-Path $ZlibRoot "zlib-1.3.1\*") $ZlibRoot -Force
}

if (-not (Test-Path (Join-Path $ZlibBuild "zlibstatic.lib"))) {
    Write-Host "Building zlib..."
    Invoke-Vc "`"$Cmake`" -S `"$ZlibRoot`" -B `"$ZlibBuild`" -G Ninja -DCMAKE_BUILD_TYPE=Release -DCMAKE_MAKE_PROGRAM=`"$Ninja`" -DBUILD_SHARED_LIBS=OFF"
    Invoke-Vc "`"$Cmake`" --build `"$ZlibBuild`" --parallel"
}

$ZlibInclude = "$ZlibRoot;$ZlibBuild"
$ZlibLib = Join-Path $ZlibBuild "zlibstatic.lib"

Write-Host "Configuring native build..."
try {
    Invoke-Vc "`"$Cmake`" -S `"$LibreDir`" -B `"$BuildDir`" -G Ninja -DCMAKE_BUILD_TYPE=Release -DCMAKE_MAKE_PROGRAM=`"$Ninja`" -DLIBRESHOCKWAVE_REQUIRE_ZLIB=ON -DZLIB_INCLUDE_DIR=`"$ZlibInclude`" -DZLIB_LIBRARY=`"$ZlibLib`""
} catch {
    Write-Host "Retry configure without requiring zlib..."
    Invoke-Vc "`"$Cmake`" -S `"$LibreDir`" -B `"$BuildDir`" -G Ninja -DCMAKE_BUILD_TYPE=Release -DCMAKE_MAKE_PROGRAM=`"$Ninja`" -DLIBRESHOCKWAVE_REQUIRE_ZLIB=OFF"
}

Write-Host "Building libreshockwave_lingo_export..."
Invoke-Vc "`"$Cmake`" --build `"$BuildDir`" --target libreshockwave_lingo_export --parallel"
if (-not (Test-Path $Bin)) { throw "missing $Bin" }

New-Item -ItemType Directory -Force -Path $Out | Out-Null

# Export EVERY handler, not the login/network keyword subset the tool defaults to.
$env:LSW_EXPORT_ALL = "1"

# ⚠ Source casts, chosen by measurement — see docs/LINGO-EXPORT-STATUS.md.
#
#   core.old.cct  Disney original (10.0#188). 987 handlers, ZERO invalid lines,
#                 and the only copy whose Core Thread Class keeps its named
#                 loader states (load_variables / load_params / load_texts /
#                 feed_texts / load_casts / validate_resources / init_threads).
#   core.new.cct  Also Disney, also 987/0, but updateState has no named states —
#                 a restructured build. 982 of 987 handlers are byte-identical
#                 to core.old; all five differences are in Core Thread Class.
#   core.cct      later re-save (10.1#11). Its CConnection, CConnectionDebug and
#                 Core Thread Class have ZERO-FILLED bytecode: 58 handlers decode
#                 as 8,775 lines of "-- invalid". DO NOT EXPORT FROM THIS.
#   vmk_8.dcr     Version 1858 — resolves every handler's first arg to the same
#                 nameId. 1860 files (core.*, vmk_14) are unaffected. A re-saved
#                 cast anyway, so excluded rather than fixed.
Write-Host "Exporting all Lingo handlers (core.old.cct + vmk_14.dcr)..."
& $Bin $Out `
    (Join-Path $Shockwave "vmk_core\core.old.cct") `
    (Join-Path $Shockwave "vmk_14.dcr") `
    2>&1 | Tee-Object -FilePath (Join-Path $Out "export.log")

Remove-Item Env:\LSW_EXPORT_ALL -ErrorAction SilentlyContinue

$LsFiles = Get-ChildItem $Out -Filter *.ls
$Invalid = 0
foreach ($File in $LsFiles) {
    $Invalid += (Get-Content $File.FullName | Where-Object { $_ -match '^\s*--\s*invalid' }).Count
}
Write-Host ""
Write-Host ("Handlers: {0}   invalid lines: {1}" -f $LsFiles.Count, $Invalid)
if ($Invalid -gt 0) {
    Write-Warning "Expected 0 invalid lines. Check the source casts against docs/LINGO-EXPORT-STATUS.md."
}

Write-Host ""
Write-Host "Done. Files in: $Out"
