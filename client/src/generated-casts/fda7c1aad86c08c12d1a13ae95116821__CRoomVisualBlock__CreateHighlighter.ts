// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualBlock / CreateHighlighter

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateHighlighter(_me: LingoMe, _this: LingoValue) {
  var t_rObj = callMethod("getObject", _this);
  var t_iTileSize = callMethod("GetParam", callMethod("GetContext", t_rObj), "TILESIZE");
  var t_ar_rSprites = callMethod("GetParam", t_rObj, "SPRITES");
  var t_veScr = callMethod("GetScrPos", t_rObj);
  setThePropOf(meProp(_me, "m_rHighLight"), "topZ", -float(400000000));
  var tSize = callNamed("rect", 0, 0, 0, 0);
  var t_ar_sprSize = new LingoList([]);
  for (var i = 1; i <= t_ar_rSprites.count; ++i) {
  var t_rStruct = t_ar_rSprites[i].param;
  var t_rSprSize = callNamed("rect", 0, 0, 0, 0);
  var tmember = callNamed("getMember", t_rStruct["GFX"]);
  if ((lingoTruthy(callNamed("voidp", tmember.image)) ? 0 : 1)) {
  /*
   * ⚠ HAND-CORRECTED: COPY the regPoint, do not alias the member's.
   * Director's `the regPoint of member` is a POINT VALUE, so the flip adjustment
   * below is local; our runtime returns the LIVE regPoint object, so
   * `setThePropOf(tRegPoint, "locH", ...)` MUTATED the member's own regPoint every
   * time a flipped (FLP=1) item was selected — permanently shifting the furni ~by
   * (width - 2*regX) px and toggling it back and forth on each click (the water
   * cooler / flying-carpet-chair "shift on click"). Cloning the point keeps the
   * highlighter geometry correct without touching the shared member.
   */
  var tRegPoint = callNamed("point", tmember.regPoint.locH, tmember.regPoint.locV);
  setThePropOf(t_rSprSize, "right", tmember.width);
  setThePropOf(t_rSprSize, "bottom", tmember.height);
  if (callNamed("integer", t_rStruct["FLP"])) {
  setThePropOf(tRegPoint, "locH", lingoBinary("sub", t_rSprSize.right, tRegPoint.locH));
  }

  setThePropOf(t_rSprSize, "left", lingoBinary("sub", t_rSprSize.left, tRegPoint.locH));
  setThePropOf(t_rSprSize, "right", lingoBinary("sub", t_rSprSize.right, tRegPoint.locH));
  setThePropOf(t_rSprSize, "top", lingoBinary("sub", t_rSprSize.top, tRegPoint.locV));
  setThePropOf(t_rSprSize, "bottom", lingoBinary("sub", t_rSprSize.bottom, tRegPoint.locV));
  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", t_rStruct, "X"))) ? 0 : 1)) {
  var tOfsX = callNamed("value", t_rStruct["X"]);
  setThePropOf(t_rSprSize, "left", lingoBinary("add", t_rSprSize.left, tOfsX));
  setThePropOf(t_rSprSize, "right", lingoBinary("add", t_rSprSize.right, tOfsX));
  }

  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", t_rStruct, "Y"))) ? 0 : 1)) {
  var tOfsY = callNamed("value", t_rStruct["Y"]);
  setThePropOf(t_rSprSize, "top", lingoBinary("add", t_rSprSize.top, tOfsY));
  setThePropOf(t_rSprSize, "bottom", lingoBinary("add", t_rSprSize.bottom, tOfsY));
  }

  if (lingoBinary("lt", t_rSprSize.left, tSize.left)) {
  setThePropOf(tSize, "left", t_rSprSize.left);
  }

  if (lingoBinary("lt", t_rSprSize.top, tSize.top)) {
  setThePropOf(tSize, "top", t_rSprSize.top);
  }

  if (lingoBinary("gt", t_rSprSize.right, tSize.right)) {
  setThePropOf(tSize, "right", t_rSprSize.right);
  }

  if (lingoBinary("gt", t_rSprSize.bottom, tSize.bottom)) {
  setThePropOf(tSize, "bottom", t_rSprSize.bottom);
  }

  var tZ = lingoBinary("add", lingoBinary("add", t_veScr.z, callNamed("integer", t_rStruct["Z"])), 1);
  if (lingoBinary("gt", tZ, meProp(_me, "m_rHighLight").topZ)) {
  setThePropOf(meProp(_me, "m_rHighLight"), "topZ", tZ);
  }

  }

  callMethod("append", t_ar_sprSize, t_rSprSize)
  }

  callMethod("RemoveHighlighter", _this)
  setThePropOf(meProp(_me, "m_rHighLight"), "member", callNamed("member", callNamed("createMember", lingoBinary("join", "HighlighterFor", _this), symbol("bitmap"))));
  setThePropOf(meProp(_me, "m_rHighLight").member, "image", callNamed("image", lingoBinary("sub", tSize.right, tSize.left), lingoBinary("sub", tSize.bottom, tSize.top), 32));
  /*
   * ⚠ HAND-CORRECTED: 8-bit alpha mask must be #grayscale.
   * Director's `image(w,h,8)` doubles as an alpha mask; our engine only builds the
   * level plane setAlpha reads for a `#grayscale` 8-bit image. Without it,
   * `copyPixels(..., #ink:39)` below has no plane to accumulate into and the later
   * `setAlpha(m_rHighLight.member.image, t_alphaImg)` bails on a null mask — so the
   * selection highlight stayed a SOLID #EFEFEF BOX instead of the item's silhouette
   * (the "flicker is a grey box, not like OG"). With the grayscale plane the mask
   * carves the highlight to shape. See [[fill-must-reset-level-plane]] / setAlpha.
   */
  var t_alphaImg = callNamed("image", lingoBinary("sub", tSize.right, tSize.left), lingoBinary("sub", tSize.bottom, tSize.top), 8, symbol("grayscale"));
  var t_rFillImage = callMethod("duplicate", meProp(_me, "m_rHighLight").member.image);
  callMethod("fill", t_rFillImage, t_rFillImage.rect, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("color"), callNamed("rgb", "#EFEFEF")]))
  for (var i = 1; i <= t_ar_rSprites.count; ++i) {
  t_rStruct = t_ar_rSprites[i].param;
  var t_rMember = callNamed("getMember", t_rStruct["GFX"]);
  if ((lingoTruthy(callNamed("voidp", t_rMember.image)) ? 0 : 1)) {
  var tSrcRect = t_rMember.image.rect;
  var tdestrect = callNamed("rect", lingoBinary("sub", t_ar_sprSize[i].left, tSize.left), lingoBinary("sub", t_ar_sprSize[i].top, tSize.top), lingoBinary("sub", t_ar_sprSize[i].right, tSize.left), lingoBinary("sub", t_ar_sprSize[i].bottom, tSize.top));
  var tDestquad = callNamed("rectToQuad", tdestrect);
  if (callNamed("integer", t_rStruct["FLP"])) {
  tDestquad = callNamed("flipQuadH", tDestquad);
  }

  var t_rSprAlpha = callMethod("extractAlpha", t_rMember.image);
  if (lingoBinary("neq", t_rSprAlpha, 0)) {
  callNamed("ClipAlphaLowValues", t_rSprAlpha, 150)
  callMethod("copyPixels", meProp(_me, "m_rHighLight").member.image, t_rFillImage, tDestquad, tSrcRect)
  callMethod("copyPixels", t_alphaImg, t_rSprAlpha, tDestquad, tSrcRect, new LingoPropList([symbol("ink"), 39, symbol("useFastQuads"), 0]))
  }

  }

  }

  t_rObj = callMethod("getObject", _this);
  t_iTileSize = callMethod("GetParam", callMethod("GetContext", t_rObj), "TILESIZE");
  var t_fItemSize = callNamed("float", callMethod("GetParam", t_rObj, "TILESIZE"));
  if (callNamed("voidp", t_fItemSize)) {
  t_fItemSize = float(32);
  }

  callMethod("setAlpha", meProp(_me, "m_rHighLight").member.image, t_alphaImg)
  setThePropOf(meProp(_me, "m_rHighLight").member, "useAlpha", 1);
  setThePropOf(meProp(_me, "m_rHighLight"), "sprite", callNamed("sprite", callNamed("reserveSprite")));
  setThePropOf(meProp(_me, "m_rHighLight").sprite, "member", meProp(_me, "m_rHighLight").member);
  /*
   * ⚠ HAND-CORRECTED: keep the reserved sprite's default COPY ink (do NOT force
   * an additive Add Pin here). The highlight is a #EFEFEF silhouette carved to
   * the item's shape (see the #grayscale mask note above); the blink pulses the
   * sprite's BLEND 0..50, so Copy composites a partial white overlay — the item
   * BRIGHTENS toward white while keeping its colour, exactly OG's selection glow.
   * An earlier Add Pin (ink 33) attempt instead ADDED the near-white silhouette,
   * which clamps to solid white at the blink's blend and rendered a WHITE BOX
   * over the (roughly box-shaped) carpet. The greying an even earlier version
   * showed was the mask being an unshaped solid box, not the ink — fixed by
   * #grayscale, so Copy is right. See lingo-stage `paint`.
   */
  if (lingoBinary("neq", t_iTileSize, t_fItemSize)) {
  var t_fScaling = lingoBinary("div", t_iTileSize, t_fItemSize);
  setThePropOf(meProp(_me, "m_rHighLight").sprite, "width", lingoBinary("mul", meProp(_me, "m_rHighLight").sprite.member.width, t_fScaling));
  setThePropOf(meProp(_me, "m_rHighLight").sprite, "height", lingoBinary("mul", meProp(_me, "m_rHighLight").sprite.member.height, t_fScaling));
  } else {
  setThePropOf(meProp(_me, "m_rHighLight").sprite, "width", meProp(_me, "m_rHighLight").sprite.member.width);
  setThePropOf(meProp(_me, "m_rHighLight").sprite, "height", meProp(_me, "m_rHighLight").sprite.member.height);
  }

  setThePropOf(meProp(_me, "m_rHighLight").sprite.member, "regPoint", callNamed("point", -float(tSize.left), -float(tSize.top)));
  setThePropOf(meProp(_me, "m_rHighLight").sprite, "locH", t_veScr.x);
  setThePropOf(meProp(_me, "m_rHighLight").sprite, "locV", t_veScr.y);
  setThePropOf(meProp(_me, "m_rHighLight").sprite, "locZ", lingoBinary("add", meProp(_me, "m_rHighLight").topZ, 1));
}

