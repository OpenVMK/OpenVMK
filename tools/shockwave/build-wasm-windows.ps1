# Build LibreShockwave WASM with zlib on Windows (no WSL sudo).
# Usage: powershell -ExecutionPolicy Bypass -File tools/shockwave/build-wasm-windows.ps1
$ErrorActionPreference = "Stop"

$Root = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent

$LibreDir = Join-Path $Root "tools\shockwave\LibreShockwave"
$Dist = Join-Path $Root "tools\shockwave\wasm\dist"
$Emsdk = Join-Path $env:USERPROFILE "emsdk"

function Ensure-Git {
    if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
        throw "git is required. Install Git for Windows."
    }
}

function Ensure-LibreShockwave {
    if (-not (Test-Path "$LibreDir\.git")) {
        Write-Host "Cloning LibreShockwave..."
        git clone --depth 1 https://github.com/LibreShockwave/LibreShockwave.git $LibreDir
    }
}

function Ensure-Emsdk {
    if (-not (Test-Path $Emsdk)) {
        Write-Host "Installing Emscripten SDK to $Emsdk (first run takes several minutes)..."
        git clone https://github.com/emscripten-core/emsdk.git $Emsdk
    }
    Push-Location $Emsdk
    try {
        if (-not (Test-Path "$Emsdk\upstream\emscripten\emcc.exe")) {
            Write-Host "Running emsdk install latest..."
            & .\emsdk install latest
        }
        & .\emsdk activate latest | Out-Null
    } finally {
        Pop-Location
    }
    $Emscripten = Join-Path $Emsdk "upstream\emscripten"
    $env:PATH = "$Emscripten;$Emsdk;$env:PATH"
    $env:EMSDK = ($Emsdk -replace '\\', '/')
    if (-not (Get-Command emcc -ErrorAction SilentlyContinue)) {
        throw "emcc not on PATH after emsdk setup"
    }
    Write-Host "Emscripten: $(& emcc --version | Select-Object -First 1)"
}

function Ensure-Ninja {
    $NinjaBin = Join-Path $Root "tools\shockwave\bin"
    $Ninja = Join-Path $NinjaBin "ninja.exe"
    if (-not (Test-Path $Ninja)) {
        New-Item -ItemType Directory -Force -Path $NinjaBin | Out-Null
        $Zip = Join-Path $NinjaBin "ninja-win.zip"
        Write-Host "Downloading ninja..."
        Invoke-WebRequest -Uri "https://github.com/ninja-build/ninja/releases/download/v1.13.2/ninja-win.zip" -OutFile $Zip -UseBasicParsing
        Expand-Archive -Path $Zip -DestinationPath $NinjaBin -Force
    }
    $script:NinjaExe = $Ninja
}

function Ensure-Cmake {
    if (Get-Command cmake -ErrorAction SilentlyContinue) { return }
    if (Get-Command winget -ErrorAction SilentlyContinue) {
        Write-Host "Installing CMake via winget..."
        winget install --id Kitware.CMake -e --accept-package-agreements --accept-source-agreements
        $env:PATH = "$env:ProgramFiles\CMake\bin;$env:PATH"
    }
    if (-not (Get-Command cmake -ErrorAction SilentlyContinue)) {
        throw "cmake not found. Install CMake or run: winget install Kitware.CMake"
    }
}

function Apply-Patch {
    python (Join-Path $Root "tools\shockwave\apply-emscripten-zlib-patch.py") (Join-Path $LibreDir "cpp\CMakeLists.txt")
    if ($LASTEXITCODE -ne 0) { throw "Failed to apply zlib patch" }
}

function Build-Wasm {
    Push-Location $LibreDir
    try {
        $Emcmake = Join-Path $Emsdk "upstream\emscripten\emcmake.exe"
        $Cmake = "C:\Program Files\CMake\bin\cmake.exe"
        if (-not (Test-Path $Cmake)) { $Cmake = "cmake" }

        if (Get-Command embuilder -ErrorAction SilentlyContinue) {
            Write-Host "Prebuilding emscripten zlib port..."
            # No 2>&1: PS 5.1 wraps native stderr in NativeCommandError, which
            # $ErrorActionPreference=Stop turns fatal. embuilder logs INFO to stderr.
            & embuilder build zlib | Out-Host
        }
        Write-Host "Configuring WASM build..."
        & $Emcmake $Cmake -S . -B cmake-build-wasm -DCMAKE_BUILD_TYPE=Release -G Ninja `
            "-DCMAKE_MAKE_PROGRAM=$NinjaExe" `
            -DLIBRESHOCKWAVE_REQUIRE_ZLIB=ON
        if ($LASTEXITCODE -ne 0) { throw "cmake configure failed ($LASTEXITCODE)" }
        Write-Host "Compiling libreshockwave_cpp_wasm_dist (several minutes)..."
        & $Cmake --build cmake-build-wasm --target libreshockwave_cpp_wasm_dist --parallel
        if ($LASTEXITCODE -ne 0) { throw "cmake build failed ($LASTEXITCODE)" }
    } finally {
        Pop-Location
    }
}

function Copy-Dist {
    $Built = Join-Path $LibreDir "cmake-build-wasm\cpp\wasm-dist"
    if (-not (Test-Path "$Built\libreshockwave-cpp-wasm.wasm")) {
        throw "Build output missing: $Built\libreshockwave-cpp-wasm.wasm"
    }
    New-Item -ItemType Directory -Force -Path $Dist | Out-Null
    Copy-Item -Path "$Built\*" -Destination $Dist -Recurse -Force
    $Player = Join-Path $Root "tools\shockwave\vmk-player.html"
    if (Test-Path $Player) {
        Copy-Item $Player (Join-Path $Dist "vmk-player.html") -Force
    }
    Write-Host "Applying fetch URL rewrite patch..."
    node (Join-Path $Root "tools\shockwave\apply-fetch-rewrite-patch.mjs")
    if ($LASTEXITCODE -ne 0) { throw "fetch rewrite patch failed" }
}

Ensure-Git
Ensure-LibreShockwave
Ensure-Emsdk
Ensure-Cmake
Ensure-Ninja
Apply-Patch
Build-Wasm
Copy-Dist

Write-Host ""
Write-Host "Done. WASM with zlib is in: $Dist"
Write-Host "Run:  npm run tools:shockwave:serve"
Write-Host "Open: http://127.0.0.1:5199/player/vmk-player.html"
