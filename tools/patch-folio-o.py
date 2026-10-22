"""Rebuild the corrupt lowercase 'o' in client/assets/fonts/FolioBoldCondensed.ttf.

The PFR->TTF conversion (and LibreShockwave's PFR rasteriser, same decoder)
mangles Folio's 'o': the outer contour stops at x=280 of a 407 advance and the
counter sits off-centre, so every 'o' in advanced-mode titles reads as a 'c'
with a hook ("Tcwn Square"). No other letter/digit is affected (scanned).

Folio's 'o' and 'e' share advance 407 and bowl: this redraws 'o' as e's outer
contour (minus the crossbar notch) with a counter built from e's own inner
arcs. Idempotent. Re-run after regenerating the TTF with pfr_to_ttf.

    python tools/patch-folio-o.py
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.ttGlyphPen import TTGlyphPen

PATH = Path(__file__).resolve().parent.parent / "client/assets/fonts/FolioBoldCondensed.ttf"

font = TTFont(PATH)
name = font.getBestCmap()[ord("o")]
pen = TTGlyphPen(font.getGlyphSet())

# Outer bowl: e's outer contour, 30..377 x -14..529.
pen.moveTo((203, -14))
pen.qCurveTo((285, -8), (335, 21))
pen.qCurveTo((370, 62), (377, 125))
pen.lineTo((377, 356))
pen.qCurveTo((372, 437), (339, 487))
pen.qCurveTo((290, 522), (203, 529))
pen.qCurveTo((117, 522), (68, 487))
pen.qCurveTo((36, 437), (30, 356))
pen.lineTo((30, 125))
pen.qCurveTo((37, 62), (72, 21))
pen.qCurveTo((121, -8), (203, -14))
pen.closePath()

# Counter: e's upper counter arcs + e's lower counter arcs, 171..248 x 97..418.
pen.moveTo((210, 418))
pen.qCurveTo((226, 416), (238, 406))
pen.qCurveTo((246, 391), (248, 368))
pen.lineTo((248, 143))
pen.qCurveTo((246, 120), (238, 107))
pen.qCurveTo((226, 99), (210, 97))
pen.qCurveTo((194, 99), (182, 107))
pen.qCurveTo((173, 120), (171, 143))
pen.lineTo((171, 368))
pen.qCurveTo((173, 391), (182, 406))
pen.qCurveTo((193, 416), (210, 418))
pen.closePath()

glyph = pen.glyph()
font["glyf"][name] = glyph
glyph.recalcBounds(font["glyf"])
adv, _ = font["hmtx"][name]
font["hmtx"][name] = (adv, glyph.xMin)
font.save(PATH)
print(f"patched {name}: adv={adv} x={glyph.xMin}..{glyph.xMax} y={glyph.yMin}..{glyph.yMax}")
