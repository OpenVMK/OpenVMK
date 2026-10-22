// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualPoster / CreateHighlighters

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateHighlighters(_me: LingoMe, _this: LingoValue) {
  var t_rObj = callMethod("getObject", _this);
  var t_ar_rSprites = callMethod("GetParam", t_rObj, "SPRITES");
  var t_veScr = callMethod("GetScrPos", t_rObj);
  setThePropOf(meProp(_me, "m_rHighLight"), "topZ", -float(400000000));
  var tSize = callNamed("rect", 0, 0, 0, 0);
  var t_ar_sprSize = new LingoList([]);
  for (var i = 1; i <= t_ar_rSprites.count; ++i) {
  var t_rStruct = t_ar_rSprites[i].param;
  var tSprSize = callNamed("rect", 0, 0, 0, 0);
  var tmember = callNamed("getMember", t_rStruct["GFX"]);
  if ((lingoTruthy(callNamed("voidp", tmember.image)) ? 0 : 1)) {
  // ⚠ HAND-CORRECTED: COPY the regPoint — see CRoomVisualBlock.CreateHighlighter.
  // Our runtime returns the LIVE regPoint, so the flip adjustment below would
  // otherwise mutate the member's own regPoint and shift a flipped poster on
  // every select.
  var tRegPoint = callNamed("point", tmember.regPoint.locH, tmember.regPoint.locV);
  setThePropOf(tSprSize, "right", tmember.width);
  setThePropOf(tSprSize, "bottom", tmember.height);
  if (callNamed("integer", t_rStruct["FLP"])) {
  setThePropOf(tRegPoint, "locH", lingoBinary("sub", tSprSize.right, tRegPoint.locH));
  }

  setThePropOf(tSprSize, "left", lingoBinary("sub", tSprSize.left, tRegPoint.locH));
  setThePropOf(tSprSize, "right", lingoBinary("sub", tSprSize.right, tRegPoint.locH));
  setThePropOf(tSprSize, "top", lingoBinary("sub", tSprSize.top, tRegPoint.locV));
  setThePropOf(tSprSize, "bottom", lingoBinary("sub", tSprSize.bottom, tRegPoint.locV));
  if (lingoBinary("lt", tSprSize.left, tSize.left)) {
  setThePropOf(tSize, "left", tSprSize.left);
  }

  if (lingoBinary("lt", tSprSize.top, tSize.top)) {
  setThePropOf(tSize, "top", tSprSize.top);
  }

  if (lingoBinary("gt", tSprSize.right, tSize.right)) {
  setThePropOf(tSize, "right", tSprSize.right);
  }

  if (lingoBinary("gt", tSprSize.bottom, tSize.bottom)) {
  setThePropOf(tSize, "bottom", tSprSize.bottom);
  }

  var tZ = lingoBinary("add", lingoBinary("add", t_veScr.z, callNamed("integer", t_rStruct["Z"])), 1);
  if (lingoBinary("gt", tZ, meProp(_me, "m_rHighLight").topZ)) {
  setThePropOf(meProp(_me, "m_rHighLight"), "topZ", tZ);
  }

  }

  callMethod("append", t_ar_sprSize, tSprSize)
  }

  callMethod("RemoveHighlighters", _this)
  setThePropOf(meProp(_me, "m_rHighLight"), "member", callNamed("member", callNamed("createMember", lingoBinary("join", "HighlighterFor", _this), symbol("bitmap"))));
  setThePropOf(meProp(_me, "m_rHighLight").member, "image", callNamed("image", lingoBinary("sub", tSize.right, tSize.left), lingoBinary("sub", tSize.bottom, tSize.top), 32));
  // ⚠ HAND-CORRECTED: #grayscale 8-bit mask — see CRoomVisualBlock.CreateHighlighter.
  // Without it setAlpha bails and the poster's selection highlight is a solid box.
  var t_alphaImg = callNamed("image", lingoBinary("sub", tSize.right, tSize.left), lingoBinary("sub", tSize.bottom, tSize.top), 8, symbol("grayscale"));
  var tFillImage = callMethod("duplicate", meProp(_me, "m_rHighLight").member.image);
  callMethod("fill", tFillImage, tFillImage.rect, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("color"), callNamed("rgb", "#EFEFEF")]))
  for (var i = 1; i <= t_ar_rSprites.count; ++i) {
  t_rStruct = t_ar_rSprites[i].param;
  tmember = callNamed("getMember", t_rStruct["GFX"]);
  if ((lingoTruthy(callNamed("voidp", tmember.image)) ? 0 : 1)) {
  var tSrcRect = tmember.image.rect;
  var tdestrect = callNamed("rect", lingoBinary("sub", t_ar_sprSize[i].left, tSize.left), lingoBinary("sub", t_ar_sprSize[i].top, tSize.top), lingoBinary("sub", t_ar_sprSize[i].right, tSize.left), lingoBinary("sub", t_ar_sprSize[i].bottom, tSize.top));
  var tDestquad = callNamed("rectToQuad", tdestrect);
  if (callNamed("integer", t_rStruct["FLP"])) {
  tDestquad = callNamed("flipQuadH", tDestquad);
  }

  var t_sprAlpha = callMethod("extractAlpha", tmember.image);
  if (lingoBinary("neq", t_sprAlpha, 0)) {
  callNamed("ClipAlphaLowValues", t_sprAlpha, 150)
  callMethod("copyPixels", meProp(_me, "m_rHighLight").member.image, tFillImage, tDestquad, tSrcRect)
  callMethod("copyPixels", t_alphaImg, t_sprAlpha, tDestquad, tSrcRect, new LingoPropList([symbol("ink"), 39, symbol("useFastQuads"), 0]))
  }

  }

  }

  callMethod("setAlpha", meProp(_me, "m_rHighLight").member.image, t_alphaImg)
  setThePropOf(meProp(_me, "m_rHighLight").member, "useAlpha", 1);
  setThePropOf(meProp(_me, "m_rHighLight"), "sprite", callNamed("sprite", callNamed("reserveSprite")));
  setThePropOf(meProp(_me, "m_rHighLight").sprite, "member", meProp(_me, "m_rHighLight").member);
  // ⚠ HAND-CORRECTED: keep the reserved sprite's default COPY ink — see
  // CRoomVisualBlock.CreateHighlighter. The blink pulses BLEND 0..50, so Copy of
  // the #EFEFEF (shaped, #grayscale mask) silhouette is a partial white overlay
  // that brightens the poster while keeping its colour. Add Pin (ink 33) instead
  // clamped to solid white = a white box.
  setThePropOf(meProp(_me, "m_rHighLight").sprite, "width", meProp(_me, "m_rHighLight").sprite.member.width);
  setThePropOf(meProp(_me, "m_rHighLight").sprite, "height", meProp(_me, "m_rHighLight").sprite.member.height);
  setThePropOf(meProp(_me, "m_rHighLight").sprite.member, "regPoint", callNamed("point", -float(tSize.left), -float(tSize.top)));
  setThePropOf(meProp(_me, "m_rHighLight").sprite, "locH", t_veScr.x);
  setThePropOf(meProp(_me, "m_rHighLight").sprite, "locV", t_veScr.y);
  setThePropOf(meProp(_me, "m_rHighLight").sprite, "locZ", lingoBinary("add", meProp(_me, "m_rHighLight").topZ, 1));
  setThePropOf(meProp(_me, "m_rHighLight"), "lastDir", callNamed("integer", callMethod("GetParam", t_rObj, "DIR")));
}

