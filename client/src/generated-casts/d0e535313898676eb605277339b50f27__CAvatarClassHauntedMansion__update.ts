// d0e535313898676eb605277339b50f27.cct / CAvatarClassHauntedMansion / update

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

  var m_rSpr = a_Spr;
  if (lingoBinary("eq", a_Spr.member.name, "")) {
  return 0;
  }

  setMeProp(_me, "m_iSync", (lingoTruthy(meProp(_me, "m_iSync")) ? 0 : 1));
  var m_rAvatarSpr = a_Spr;
  setMeProp(_me, "m_iLoc", a_veAvatarLoc);
  callMethod("arrangeParts", _me)
  if (meProp(_me, "m_iSync")) {
  callMethod("prepare", _me)
  } else {
  callMethod("render", _me)
  var t_Obj = callMethod("_AccessRoom", callNamed("getThread", symbol("room")).component);
  var t_iRatio = lingoBinary("div", callNamed("float", meProp(_me, "m_iTileSize")), float(32));
  var t_Img = callNamed("image", meProp(_me, "m_iCanvasWidth"), meProp(_me, "m_iCanvasHeight"), 32);
  callMethod("fill", t_Img, t_Img.rect, callNamed("rgb", 0, 0, 0))
  var t_rAlpha = callNamed("image", meProp(_me, "m_iCanvasWidth"), meProp(_me, "m_iCanvasHeight"), 8, symbol("grayscale"));
  var t_iRect1 = lingoBinary("div", lingoBinary("sub", meProp(_me, "m_iCanvasWidth"), lingoBinary("mul", meProp(_me, "m_iCanvasWidth"), t_iRatio)), 2);
  var t_iRect2 = lingoBinary("sub", meProp(_me, "m_iCanvasHeight"), lingoBinary("mul", meProp(_me, "m_iCanvasHeight"), t_iRatio));
  var t_iRect3 = lingoBinary("sub", meProp(_me, "m_iCanvasWidth"), t_iRect1);
  var t_rDestRect = callNamed("rect", t_iRect1, t_iRect2, t_iRect3, meProp(_me, "m_iCanvasHeight"));
  callMethod("copyPixels", t_Img, meProp(_me, "m_imgBuffer"), t_rDestRect, meProp(_me, "m_imgBuffer").rect, lingoBinary("eq", symbol("useFastQuads"), 1))
  callMethod("copyPixels", t_rAlpha, meProp(_me, "m_rAlpha"), t_rDestRect, meProp(_me, "m_rAlpha").rect, lingoBinary("eq", symbol("useFastQuads"), 1))
  var t_rImg = a_Spr.member.image;
  if (callNamed("voidp", t_rImg)) {
  return 0;
  }

  callMethod("copyPixels", t_rImg, t_Img, t_rImg.rect, t_Img.rect, lingoBinary("eq", symbol("useFastQuads"), 1))
  callMethod("setAlpha", t_rImg, t_rAlpha)
  setThePropOf(t_rImg, "useAlpha", 1);
  setThePropOf(a_Spr.member, "regPoint", callNamed("point", 40, 144));
  setThePropOf(a_Spr, "flipH", meProp(_me, "m_bFlipped"));
  callMethod("ShowBeam", _me, meProp(_me, "m_iBeamCounter"))
  }

}

