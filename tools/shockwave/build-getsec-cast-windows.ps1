# Build native GetSec cast synthesizer (VS 2022 + CMake + Ninja).
$ErrorActionPreference = "Stop"

$Root = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$LibreDir = Join-Path $Root "tools\shockwave\LibreShockwave"
$Ninja = Join-Path $Root "tools\shockwave\bin\ninja.exe"
$Cmake = "C:\Program Files\CMake\bin\cmake.exe"
$BuildDir = Join-Path $LibreDir "cmake-build-native"
$Bin = Join-Path $BuildDir "cpp\libreshockwave_getsec_cast.exe"

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
$ZlibInclude = "$ZlibRoot;$ZlibBuild"
$ZlibLib = Join-Path $ZlibBuild "zlibstatic.lib"

if (-not (Test-Path $BuildDir)) {
    Write-Host "Configuring native build..."
    try {
        Invoke-Vc "`"$Cmake`" -S `"$LibreDir`" -B `"$BuildDir`" -G Ninja -DCMAKE_BUILD_TYPE=Release -DCMAKE_MAKE_PROGRAM=`"$Ninja`" -DLIBRESHOCKWAVE_REQUIRE_ZLIB=ON -DZLIB_INCLUDE_DIR=`"$ZlibInclude`" -DZLIB_LIBRARY=`"$ZlibLib`""
    } catch {
        Invoke-Vc "`"$Cmake`" -S `"$LibreDir`" -B `"$BuildDir`" -G Ninja -DCMAKE_BUILD_TYPE=Release -DCMAKE_MAKE_PROGRAM=`"$Ninja`" -DLIBRESHOCKWAVE_REQUIRE_ZLIB=OFF"
    }
}

Write-Host "Building libreshockwave_getsec_cast + libreshockwave_getsec_probe..."
Invoke-Vc "`"$Cmake`" --build `"$BuildDir`" --target libreshockwave_getsec_cast libreshockwave_getsec_probe --parallel"
if (-not (Test-Path $Bin)) { throw "missing $Bin" }

$OutDir = Join-Path $Root "tools\shockwave\getsec-probe\output"
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
$TestOut = Join-Path $OutDir "synthetic-getsec.cct"
& $Bin "dev-secret-1" "dev-secret-2" "dev-secret-3" $TestOut
Write-Host "Test cast: $TestOut ($(Get-Item $TestOut).Length bytes)"
