// d0e535313898676eb605277339b50f27.cct / CAvatarRenderer / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, a_veAvatarLoc: LingoValue, a_Spr: LingoValue) {
  if (callNamed("voidp", a_Spr)) {
  return 0;
  }

  if (callNamed("voidp", a_Spr.member)) {
  return 0;
  }

  if (lingoBinary("eq", a_Spr.member.name, "")) {
  return 0;
  }

  setMeProp(_me, "m_iSync", (lingoTruthy(meProp(_me, "m_iSync")) ? 0 : 1));
  setMeProp(_me, "m_rAvatarSpr", a_Spr);
  setMeProp(_me, "m_iLoc", a_veAvatarLoc);
  callMethod("arrangeParts", _me)
  if (meProp(_me, "m_iSync")) {
  callMethod("prepare", _me)
  } else {
  if (meProp(_me, "m_bChanges")) {
  callMethod("render", _me)
  setThePropOf(a_Spr.member, "image", callNamed("image", 80, 160, 32));
  var t_rImg = a_Spr.member.image;
  if (callNamed("voidp", t_rImg)) {
  return 0;
  }

  if (meProp(_me, "m_bActSit")) {
  var t_iH = lingoBinary("div", t_rImg.width, 2);
  var t_iV = lingoBinary("sub", t_rImg.height, 45);
  } else {
  t_iH = lingoBinary("div", t_rImg.width, 2);
  t_iV = lingoBinary("sub", t_rImg.height, 16);
  }

  if (lingoBinary("gt", meProp(_me, "m_iMagic"), 99)) {
  t_iV = lingoBinary("sub", t_rImg.height, 25);
  }

  if (callNamed("objectp", meProp(_me, "m_Obj_Magic"))) {
  switch (meProp(_me, "m_iMagic")) {
case 17:
  callMethod("SitStateForDiving", meProp(_me, "m_Obj_Magic"), meProp(_me, "m_bActSit"))
  break;
case 25:
  callMethod("TalkStateForShark", meProp(_me, "m_Obj_Magic"), meProp(_me, "m_bActTlk"))
  break;
  }

  }

  var t_pnt = callNamed("point", t_iH, t_iV);
  setThePropOf(a_Spr.member, "regPoint", t_pnt);
  if (callNamed("objectp", meProp(_me, "m_Obj_Magic"))) {
  setMeProp(_me, "m_iMagicCounter", lingoBinary("add", meProp(_me, "m_iMagicCounter"), 1));
  callMethod("DrawMagic", _me, a_Spr, a_veAvatarLoc)
  } else {
  setThePropOf(a_Spr, "blend", 100);
  }

  if (callNamed("objectp", meProp(_me, "m_Obj_Vehicle"))) {
  switch (meProp(_me, "m_iVehicle")) {
case 5:
  t_iV = lingoBinary("sub", t_rImg.height, 19);
  t_iH = lingoBinary("sub", t_iH, 1);
  switch (meProp(_me, "m_iBdDir")) {
case 1:
case 7:
  t_iV = lingoBinary("sub", t_rImg.height, 14);
  t_iH = lingoBinary("sub", t_iH, 3);
  break;
  break;
  }

  break;
case 6:
  t_iV = lingoBinary("sub", t_rImg.height, 25);
  break;
case 7:
  t_iV = lingoBinary("sub", t_rImg.height, 12);
  break;
case 8:
case 9:
case 12:
case 13:
  t_iV = lingoBinary("sub", t_rImg.height, 16);
  break;
case 10:
  t_iV = lingoBinary("sub", t_rImg.height, 20);
  break;
case 11:
  setMeProp(_me, "m_iVehicleAnimCounter", lingoBinary("add", meProp(_me, "m_iVehicleAnimCounter"), 1));
  if (lingoBinary("gt", meProp(_me, "m_iVehicleAnimCounter"), 20)) {
  setMeProp(_me, "m_iVehicleAnimCounter", 1);
  }

  var t_ar_FloatingPoints = new LingoList([0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 2, 2, 2, 2, 1, 1, -float(1), -float(1)]);
  var t_iFloatPoint = t_ar_FloatingPoints[meProp(_me, "m_iVehicleAnimCounter")];
  t_iV = lingoBinary("sub", t_rImg.height, lingoBinary("add", 17, t_iFloatPoint));
  break;
  break;
  break;
  break;
  }

  setThePropOf(a_Spr.member, "regPoint", callNamed("point", t_iH, t_iV));
  callMethod("DrawVehicle", _me, a_Spr)
  }

  if (lingoBinary("gt", meProp(_me, "m_iEmoticon"), 0)) {
  callMethod("DrawEmoticons", _me, a_Spr)
  }

  if (lingoBinary("and", meProp(_me, "m_bShowArrow"), (lingoTruthy(meProp(_me, "m_bNameTagShown")) ? 0 : 1))) {
  callMethod("DrawArrows", _me, a_Spr)
  }

  var t_iCanvasWidth = meProp(_me, "m_imgBuffer").width;
  var t_iCanvasHeight = meProp(_me, "m_imgBuffer").height;
  var t_iRatio = lingoBinary("div", callNamed("float", meProp(_me, "m_iTileSize")), float(32));
  var t_Img = callNamed("image", t_iCanvasWidth, t_iCanvasHeight, 32);
  /*
   * ⚠ HAND-CORRECTED: start the downscale canvas TRANSPARENT, not black.
   * The original fills rgb(0,0,0) and then copies the avatar in with a SMOOTHED
   * downscale (see the #smooth note below), so every edge pixel was blended
   * with that black before `setAlpha` applied the (now equally smoothed) mask —
   * a dark ring round every edge. Invisible on the avatar's own dark outline,
   * but each 2px confetti piece (effect 34) wore a black halo that flickered as
   * the pieces moved, in far-away rooms only (tile 32 does not resample).
   * Transparent start keeps edge colours true; the mask still decides coverage.
   * Same fix as `_ShrinkToThumbnail`.
   */
  callNamed("clearTransparent", t_Img)
  var t_rAlpha = callNamed("image", t_iCanvasWidth, t_iCanvasHeight, 8, symbol("grayscale"));
  var t_iRect1 = lingoBinary("div", lingoBinary("sub", t_iCanvasWidth, lingoBinary("mul", t_iCanvasWidth, t_iRatio)), 2);
  var t_iRect2 = lingoBinary("sub", t_iCanvasHeight, lingoBinary("mul", t_iCanvasHeight, t_iRatio));
  var t_iRect3 = lingoBinary("sub", t_iCanvasWidth, t_iRect1);
  var t_rDestRect = callNamed("rect", t_iRect1, t_iRect2, t_iRect3, t_iCanvasHeight);
  /*
   * ⚠ HAND-CORRECTED: request #smooth on the avatar's perspective DOWNSCALE.
   *
   * The original passes `#useFastQuads = 1`, which is a `=`/`:` typo: it is the
   * boolean expression (#useFastQuads = 1) = 0, NOT the prop list
   * [#useFastQuads: 1], so fast-quads never engaged and real Director used its
   * smoothed (non-fast-quads) default for this scaled copyPixels. Our port draws
   * everything crisp (nearest) by default, which left room avatars visibly
   * blockier than the OG client when the room downscales them (ratio =
   * tileSize/32; e.g. Town Square 80x160 -> 60x120). `#smooth` opts this one
   * scaled blit back into bilinear, matching the OG. Scoped to the avatar; UI
   * pixel-art stays crisp. See [[avatar-scaling-nearest-is-faithful]].
   */
  callMethod("copyPixels", t_Img, meProp(_me, "m_imgBuffer"), t_rDestRect, meProp(_me, "m_imgBuffer").rect, new LingoPropList([symbol("smooth"), 1]))
  callMethod("copyPixels", t_rAlpha, meProp(_me, "m_rAlpha"), t_rDestRect, meProp(_me, "m_rAlpha").rect, new LingoPropList([symbol("smooth"), 1]))
  var t_iWidth = t_Img.width;
  var t_iHeight = t_Img.height;
  if (meProp(_me, "m_bActSit")) {
  t_iH = lingoBinary("div", t_iWidth, 2);
  t_iV = lingoBinary("sub", t_iHeight, 45);
  } else {
  t_iH = lingoBinary("div", t_iWidth, 2);
  t_iV = lingoBinary("sub", t_iHeight, 16);
  }

  if (callNamed("objectp", meProp(_me, "m_Obj_Vehicle"))) {
  switch (meProp(_me, "m_iVehicle")) {
case 5:
  t_iV = lingoBinary("sub", t_iHeight, 35);
  break;
case 7:
case 10:
  t_iV = lingoBinary("sub", t_iHeight, 15);
  break;
case 11:
  t_ar_FloatingPoints = new LingoList([0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 2, 2, 2, 2, 1, 1, -float(1), -float(1)]);
  t_iFloatPoint = t_ar_FloatingPoints[meProp(_me, "m_iVehicleAnimCounter")];
  t_iV = lingoBinary("add", t_iHeight, lingoBinary("add", 10, t_iFloatPoint));
  break;
  default:
  t_iV = lingoBinary("sub", t_iHeight, 30);
  break;
  }

  }

  switch (meProp(_me, "m_iMagic")) {
case 10:
  t_iV = lingoBinary("add", lingoBinary("add", t_iV, 30), callNamed("random", 3));
  break;
case 11:
  if (lingoBinary("gt", meProp(_me, "m_iMagicCounter"), 6)) {
  t_iV = lingoBinary("add", t_iV, 80);
  }

  break;
case 16:
  switch (1) {
case meProp(_me, "m_bActSit"):
  t_iV = lingoBinary("sub", t_iHeight, 15);
  break;
case meProp(_me, "m_bActTlk"):
  t_iV = lingoBinary("sub", t_iHeight, 18);
  break;
  }

  break;
case 17:
  if (lingoBinary("gt", meProp(_me, "m_iMagicCounter"), 15)) {
  setMeProp(_me, "m_iMagicCounter", 1);
  }

  var t_arHeightList = new LingoList([0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 0]);
  t_iV = lingoBinary("add", lingoBinary("add", t_iV, 6), t_arHeightList[meProp(_me, "m_iMagicCounter")]);
  break;
case 18:
  if (lingoBinary("gt", meProp(_me, "m_iMagicCounter"), 15)) {
  setMeProp(_me, "m_iMagicCounter", 1);
  }

  t_arHeightList = new LingoList([0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 0]);
  if (lingoBinary("eq", meProp(_me, "m_sSPaceWalkAct"), "wlk")) {
  t_iV = lingoBinary("add", lingoBinary("add", t_iV, 6), t_arHeightList[meProp(_me, "m_iMagicCounter")]);
  } else {
  t_iV = lingoBinary("add", lingoBinary("add", t_iV, 6), t_arHeightList[meProp(_me, "m_iMagicCounter")]);
  }

  break;
case 25:
  t_iV = lingoBinary("add", t_iV, 20);
  break;
// HAND-CORRECTED: Levitation (35). a later build's CMagicFactor_new only adds the
// cloud (at the feet); its renderer, which lifted the avatar, is not in the
// extras cast. Float it above the cloud with the same bob as diving (17).
case 35:
  if (lingoBinary("gt", meProp(_me, "m_iMagicCounter"), 15)) {
  setMeProp(_me, "m_iMagicCounter", 1);
  }

  t_arHeightList = new LingoList([0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 0]);
  t_iV = lingoBinary("add", lingoBinary("add", t_iV, 14), t_arHeightList[meProp(_me, "m_iMagicCounter")]);
  break;
case 8:
case 9:
case 10:
case 11:
case 12:
case 14:
case 15:
case 19:
case 22:
case 23:
case 24:
// HAND-CORRECTED: Confetti (34) places by its union regpoint like the other composited effects.
case 34:
case 100:
case 101:
case 102:
case 103:
case 104:
case 105:
case 106:
case 107:
case 108:
case 109:
case 110:
case 111:
case 112:
case 113:
case 114:
case 115:
  if (lingoBinary("neq", undefined, meProp(_me, "m_PntMagicRegPoint"))) {
  t_iH = meProp(_me, "m_PntMagicRegPoint")[1];
  t_iV = meProp(_me, "m_PntMagicRegPoint")[2];
  if (lingoBinary("and", lingoBinary("and", lingoBinary("gt", meProp(_me, "m_iEmoticon"), 0), meProp(_me, "m_bShowArrow")), (lingoTruthy(meProp(_me, "m_bNameTagShown")) ? 0 : 1))) {
  t_iV = lingoBinary("add", meProp(_me, "m_PntMagicRegPoint")[2], 75);
  } else {
  if (lingoBinary("gt", meProp(_me, "m_iEmoticon"), 0)) {
  t_iV = lingoBinary("add", meProp(_me, "m_PntMagicRegPoint")[2], 40);
  } else {
  if (lingoBinary("and", meProp(_me, "m_bShowArrow"), (lingoTruthy(meProp(_me, "m_bNameTagShown")) ? 0 : 1))) {
  t_iV = lingoBinary("add", meProp(_me, "m_PntMagicRegPoint")[2], 36);
  }

  }

  }
  // HAND-CORRECTED: the union regpoint is in the UNSCALED image, but in a
  // far-away room (tile != 32) the image was just shrunk into t_rDestRect.
  // Used raw, the anchor was off by (1 - ratio) x (distance to the bottom),
  // which changes every frame a car bounces: the avatar bobbed in its car
  // (and effects shifted) only in far rooms. Map it into the shrunk image.
  if (lingoBinary("neq", meProp(_me, "m_iTileSize"), 32)) {
  t_iH = lingoBinary("add", t_iRect1, lingoBinary("mul", t_iH, t_iRatio));
  t_iV = lingoBinary("add", t_iRect2, lingoBinary("mul", t_iV, t_iRatio));
  }


  }

  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  }

  callMethod("setAlpha", t_Img, t_rAlpha)
  setThePropOf(t_Img, "useAlpha", 1);
  setThePropOf(a_Spr, "width", t_iWidth);
  setThePropOf(a_Spr, "height", t_iHeight);
  setThePropOf(a_Spr.member, "image", t_Img);
  setThePropOf(a_Spr.member, "regPoint", callNamed("point", t_iH, t_iV));
  setThePropOf(a_Spr, "flipH", meProp(_me, "m_bFlipped"));
  }

  }

  return 1;
}

