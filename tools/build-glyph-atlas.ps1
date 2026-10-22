<#
.SYNOPSIS
  Rasterises a font to a HINTED glyph atlas the client can blit, instead of
  asking canvas to draw text.

.DESCRIPTION
  WHY THIS EXISTS

  Director on Windows rendered text through GDI, which GRID-FITS glyphs using
  the font's hinting bytecode before rasterising. Canvas exposes no equivalent:
  its own rasteriser is only lightly hinted (too heavy, mixed 1px/2px stems),
  and supersampling the outline and point-sampling it bypasses hinting entirely
  (right weight, wrong shapes). No threshold can bridge that, because
  grid-fitting happens BEFORE rasterisation.

  This machine has the same GDI. `SingleBitPerPixelGridFit` is precisely
  "hinted + aliased", which is what Director used.

  MEASURED against a native-resolution capture of the original registration
  name list, rendering "SparkleComet185":

      reference          inkPx 220   ink/char 14.7   S 8 rows   o 6 rows
      Arial 11px GDI     inkPx 221   ink/char 14.7   S 8 rows   o 6 rows

  i.e. the glyph bitmaps agree to within a single pixel.

  ⚠ RENDER SIZE AND ADVANCE SIZE DIFFER, AND THAT IS DELIBERATE. The same
  reference spans 95px where GDI's own 11px advances give 83px, while the 12px
  advances the client already measures give 96px. So the original rasterises
  glyphs at one ppem and spaces them on another. This script therefore emits
  BITMAPS ONLY; the client keeps using its existing `measureText` advances for
  positioning. Do not "fix" that by baking 11px advances in.

.EXAMPLE
  pwsh tools/build-glyph-atlas.ps1 -Family "Arial" -RenderSize 11 -Name arial-11
#>
[CmdletBinding()]
param(
  [Parameter(Mandatory)] [string] $Family,
  [Parameter(Mandatory)] [int]    $RenderSize,
  [Parameter(Mandatory)] [string] $Name,
  [string] $Style = "Regular",
  # A font file to use instead of an installed family — for the PFR-derived
  # faces in client/assets/fonts, which are not installed system-wide.
  [string] $FontFile = "",
  [string] $OutDir = "client/assets/fonts/atlas",
  # Antialiased grid-fit instead of aliased, for members whose `antiAlias` is on.
  [switch] $AntiAliased,
  <#
    Render at N x the target size and keep a pixel only when the CENTRE of its
    cell is inside the glyph — a point-in-outline test rather than a coverage
    test.

    ⚠ FOR FACES WHOSE HINTING IS GONE. The PFR->TTF conversion drops the `orus`
    control values, which ARE the stem edges, so GDI has nothing to grid-fit
    with and Folio's stems come out 2px where the original has 1px. Supersampled
    centre sampling produces uniform 1px stems without hinting information.
    Leave OFF for faces that convert cleanly (Foxley, and any installed system
    font) — there, GDI's own grid-fitting is both correct and better.
  #>
  [int] $Supersample = 0
)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

# The printable ASCII range covers every name and UI caption VMK composes.
$FIRST = 32
$LAST  = 126

$private = $null
$fontFamily = $null
if ($FontFile -ne "") {
  $private = New-Object System.Drawing.Text.PrivateFontCollection
  $private.AddFontFile((Resolve-Path $FontFile).Path)
  $fontFamily = $private.Families[0]
  Write-Host "loaded font file: $FontFile  -> family '$($fontFamily.Name)'"
} else {
  $fontFamily = New-Object System.Drawing.FontFamily $Family
}

$fontStyle = [System.Drawing.FontStyle]::$Style
$font = New-Object System.Drawing.Font($fontFamily, $RenderSize, $fontStyle, [System.Drawing.GraphicsUnit]::Pixel)

# Baseline position: the face's ascent scaled to this pixel size.
$em      = $fontFamily.GetEmHeight($fontStyle)
$ascent  = $fontFamily.GetCellAscent($fontStyle)
$descent = $fontFamily.GetCellDescent($fontStyle)
$ascentPx  = [Math]::Ceiling($RenderSize * $ascent  / $em)
$descentPx = [Math]::Ceiling($RenderSize * $descent / $em)

# Generous per-glyph cell; trimmed to the ink box afterwards.
$CELL = [int]([Math]::Max(24, $RenderSize * 3))
$PAD  = 6
$hint = if ($AntiAliased) {
  [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
} else {
  [System.Drawing.Text.TextRenderingHint]::SingleBitPerPixelGridFit
}

# Typographic layout: no GDI+ side padding, so `left` is the real bearing.
$stringFormat = [System.Drawing.StringFormat]::GenericTypographic.Clone()
$stringFormat.FormatFlags = $stringFormat.FormatFlags -bor [System.Drawing.StringFormatFlags]::MeasureTrailingSpaces

$glyphs = @{}
$boxes  = @()

$SS = if ($Supersample -gt 1) { $Supersample } else { 1 }
$ssFont = if ($SS -gt 1) {
  New-Object System.Drawing.Font($fontFamily, ($RenderSize * $SS), $fontStyle, [System.Drawing.GraphicsUnit]::Pixel)
} else { $null }

foreach ($code in $FIRST..$LAST) {
  $ch = [char]$code
  if ($SS -gt 1) {
    # Render large, then keep the pixel whose CELL CENTRE is inside the glyph.
    $big = New-Object System.Drawing.Bitmap ($CELL * $SS), ($CELL * $SS)
    $gb = [System.Drawing.Graphics]::FromImage($big)
    $gb.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    $gb.Clear([System.Drawing.Color]::Black)
    $gb.DrawString([string]$ch, $ssFont, [System.Drawing.Brushes]::White, ($PAD * $SS), ($PAD * $SS), $stringFormat)
    $gb.Dispose()
    $bmp = New-Object System.Drawing.Bitmap $CELL, $CELL
    $half = [int]([Math]::Floor($SS / 2))
    for ($yy = 0; $yy -lt $CELL; $yy++) {
      for ($xx = 0; $xx -lt $CELL; $xx++) {
        $v = $big.GetPixel($xx * $SS + $half, $yy * $SS + $half).R
        $on = if ($v -ge 250) { 255 } else { 0 }
        $bmp.SetPixel($xx, $yy, [System.Drawing.Color]::FromArgb(255, $on, $on, $on))
      }
    }
    $big.Dispose()
    $g = $null
  } else {
  $bmp = New-Object System.Drawing.Bitmap $CELL, $CELL
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.TextRenderingHint = $hint
  $g.Clear([System.Drawing.Color]::Black)
  # Draw from a known origin so bearings can be recorded against pen+baseline.
  #
  # ⚠ GenericTypographic, NOT the default StringFormat. GDI+ `DrawString`
  # otherwise adds its own side padding (~1/6 em), which lands in the recorded
  # `left` bearing and shifts every glyph right at draw time. MEASURED against
  # the original: captions sat 3px right at 16px (≈1/6 em) until this was set.
  $g.DrawString([string]$ch, $font, [System.Drawing.Brushes]::White, $PAD, $PAD, $stringFormat)
  $g.Dispose()
  }

  $minX = 9999; $maxX = -1; $minY = 9999; $maxY = -1
  $data = New-Object 'System.Collections.Generic.List[int]'
  for ($y = 0; $y -lt $CELL; $y++) {
    for ($x = 0; $x -lt $CELL; $x++) {
      $v = $bmp.GetPixel($x, $y).R
      if ($v -gt 0) {
        if ($x -lt $minX) { $minX = $x }
        if ($x -gt $maxX) { $maxX = $x }
        if ($y -lt $minY) { $minY = $y }
        if ($y -gt $maxY) { $maxY = $y }
      }
    }
  }
  if ($maxX -lt 0) {
    # Blank glyph (space) — no bitmap, the advance carries it.
    $glyphs[[string]$code] = @{ w = 0; h = 0; left = 0; top = 0 }
    $bmp.Dispose()
    continue
  }
  $w = $maxX - $minX + 1
  $h = $maxY - $minY + 1
  # Bearings relative to the pen origin and the BASELINE.
  $left = $minX - $PAD
  $top  = $minY - ($PAD + $ascentPx)
  $rows = New-Object 'System.Collections.Generic.List[string]'
  for ($y = $minY; $y -le $maxY; $y++) {
    $sb = New-Object System.Text.StringBuilder
    for ($x = $minX; $x -le $maxX; $x++) {
      [void]$sb.Append(("{0:x2}" -f $bmp.GetPixel($x, $y).R))
    }
    $rows.Add($sb.ToString())
  }
  $glyphs[[string]$code] = @{ w = $w; h = $h; left = $left; top = $top; rows = $rows }
  $boxes += [pscustomobject]@{ code = $code; w = $w; h = $h }
  $bmp.Dispose()
}

$font.Dispose()
if ($private) { $private.Dispose() }

$outDirFull = Join-Path (Get-Location) $OutDir
if (-not (Test-Path $outDirFull)) { New-Item -ItemType Directory -Path $outDirFull -Force | Out-Null }

$doc = [ordered]@{
  family      = $fontFamily.Name
  style       = $Style
  renderSize  = $RenderSize
  antiAliased = [bool]$AntiAliased
  ascent      = $ascentPx
  descent     = $descentPx
  first       = $FIRST
  last        = $LAST
  glyphs      = $glyphs
}
$json = $doc | ConvertTo-Json -Depth 6 -Compress
$outFile = Join-Path $outDirFull "$Name.json"
[System.IO.File]::WriteAllText($outFile, $json, (New-Object System.Text.UTF8Encoding $false))

$inked = ($boxes | Measure-Object).Count
Write-Host "wrote $outFile"
Write-Host "  family='$($fontFamily.Name)' style=$Style renderSize=${RenderSize}px antiAliased=$AntiAliased"
Write-Host "  ascent=${ascentPx}px descent=${descentPx}px  glyphs with ink: $inked of $($LAST - $FIRST + 1)"
Write-Host "  bytes: $((Get-Item $outFile).Length)"
