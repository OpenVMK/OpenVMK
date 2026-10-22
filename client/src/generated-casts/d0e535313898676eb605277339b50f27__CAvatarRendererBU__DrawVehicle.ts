// d0e535313898676eb605277339b50f27.cct / CAvatarRendererBU / DrawVehicle

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DrawVehicle(_me: LingoMe, a_Spr: LingoValue) {
  var t_rImg = a_Spr.member.image;
  var t_iRatio = 1;
  var t_Img = callNamed("image", 80, 160, 32);
  callMethod("fill", t_Img, t_Img.rect, callNamed("rgb", 0, 0, 0))
  var t_rAlpha = callNamed("image", 80, 160, 8, symbol("grayscale"));
  callMethod("copyPixels", t_Img, meProp(_me, "m_imgBuffer"), meProp(_me, "m_imgBuffer").rect, meProp(_me, "m_imgBuffer").rect, lingoBinary("eq", symbol("useFastQuads"), 1))
  callMethod("copyPixels", t_rAlpha, meProp(_me, "m_rAlpha"), meProp(_me, "m_rAlpha").rect, meProp(_me, "m_rAlpha").rect, lingoBinary("eq", symbol("useFastQuads"), 1))
  callMethod("copyPixels", t_rImg, t_Img, t_rImg.rect, t_Img.rect, lingoBinary("eq", symbol("useFastQuads"), 1))
  callMethod("setAlpha", t_rImg, t_rAlpha)
  setThePropOf(t_rImg, "useAlpha", 1);
  var t_ShirtCol = callMethod("GetShirtColor", _me);
  var t_ImgAvatar = callMethod("update", meProp(_me, "m_Obj_Vehicle"), a_Spr, t_ShirtCol);
  if (callNamed("voidp", t_ImgAvatar)) {
  return;
  }

  setMeProp(_me, "m_imgBuffer", t_ImgAvatar[1]);
  setMeProp(_me, "m_rAlpha", t_ImgAvatar[2]);
  setMeProp(_me, "m_iCanvasWidth", meProp(_me, "m_imgBuffer").width);
  setMeProp(_me, "m_iCanvasHeight", meProp(_me, "m_imgBuffer").height);
  t_Img = callNamed("image", meProp(_me, "m_iCanvasWidth"), meProp(_me, "m_iCanvasHeight"), 32);
  callMethod("fill", t_Img, t_Img.rect, callNamed("rgb", 0, 0, 0))
  t_rAlpha = callNamed("image", meProp(_me, "m_iCanvasWidth"), meProp(_me, "m_iCanvasHeight"), 8, symbol("grayscale"));
  setThePropOf(a_Spr.member, "image", callNamed("image", meProp(_me, "m_iCanvasWidth"), meProp(_me, "m_iCanvasHeight"), 32));
  t_rImg = a_Spr.member.image;
}

