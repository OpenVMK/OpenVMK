// d0e535313898676eb605277339b50f27.cct / CSwimmerAvatarRender / update

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

  var t_pnt = callNamed("point", t_iH, t_iV);
  setThePropOf(a_Spr.member, "regPoint", t_pnt);
  if (callNamed("objectp", meProp(_me, "m_Obj_Magic"))) {
  setMeProp(_me, "m_iMagicCounter", lingoBinary("add", meProp(_me, "m_iMagicCounter"), 1));
  callMethod("DrawMagic", _me, a_Spr, a_veAvatarLoc)
  } else {
  setThePropOf(a_Spr, "blend", 100);
  }

  if (lingoBinary("gt", meProp(_me, "m_iEmoticon"), 0)) {
  callMethod("DrawEmoticons", _me, a_Spr)
  }

  if (meProp(_me, "m_bShowArrow")) {
  callMethod("DrawArrows", _me, a_Spr)
  }

  var t_iCanvasWidth = meProp(_me, "m_imgBuffer").width;
  var t_iCanvasHeight = meProp(_me, "m_imgBuffer").height;
  var t_iRatio = lingoBinary("div", callNamed("float", meProp(_me, "m_iTileSize")), float(32));
  var t_Img = callNamed("image", t_iCanvasWidth, t_iCanvasHeight, 32);
  callMethod("fill", t_Img, t_Img.rect, callNamed("rgb", 0, 0, 0))
  var t_rAlpha = callNamed("image", t_iCanvasWidth, t_iCanvasHeight, 8, symbol("grayscale"));
  var t_iRect1 = lingoBinary("div", lingoBinary("sub", t_iCanvasWidth, lingoBinary("mul", t_iCanvasWidth, t_iRatio)), 2);
  var t_iRect2 = lingoBinary("sub", t_iCanvasHeight, lingoBinary("mul", t_iCanvasHeight, t_iRatio));
  var t_iRect3 = lingoBinary("sub", t_iCanvasWidth, t_iRect1);
  var t_rDestRect = callNamed("rect", t_iRect1, t_iRect2, t_iRect3, t_iCanvasHeight);
  callMethod("copyPixels", t_Img, meProp(_me, "m_imgBuffer"), t_rDestRect, meProp(_me, "m_imgBuffer").rect, lingoBinary("eq", symbol("useFastQuads"), 1))
  callMethod("copyPixels", t_rAlpha, meProp(_me, "m_rAlpha"), t_rDestRect, meProp(_me, "m_rAlpha").rect, lingoBinary("eq", symbol("useFastQuads"), 1))
  var t_iWidth = t_Img.width;
  var t_iHeight = t_Img.height;
  if (meProp(_me, "m_bActSit")) {
  t_iH = lingoBinary("div", t_iWidth, 2);
  t_iV = lingoBinary("sub", t_iHeight, 45);
  } else {
  t_iH = lingoBinary("div", t_iWidth, 2);
  t_iV = lingoBinary("sub", t_iHeight, 16);
  }

  switch (meProp(_me, "m_iMagic")) {
case 20:
  t_iV = lingoBinary("sub", t_iHeight, 60);
  break;
  }

  t_pnt = callNamed("point", t_iH, t_iV);
  setThePropOf(a_Spr, "width", t_iWidth);
  setThePropOf(a_Spr, "height", t_iHeight);
  setThePropOf(a_Spr.member, "image", callNamed("image", t_iWidth, t_iHeight, 32));
  t_rImg = a_Spr.member.image;
  callMethod("copyPixels", t_rImg, t_Img, t_rImg.rect, t_Img.rect, lingoBinary("eq", symbol("useFastQuads"), 1))
  callMethod("setAlpha", t_rImg, t_rAlpha)
  setThePropOf(t_rImg, "useAlpha", 1);
  setThePropOf(a_Spr.member, "regPoint", t_pnt);
  setThePropOf(a_Spr, "flipH", meProp(_me, "m_bFlipped"));
  }

  }

  return 1;
}

