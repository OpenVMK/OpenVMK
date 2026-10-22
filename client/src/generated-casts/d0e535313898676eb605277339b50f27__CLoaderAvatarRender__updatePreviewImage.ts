// d0e535313898676eb605277339b50f27.cct / CLoaderAvatarRender / updatePreviewImage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updatePreviewImage(_me: LingoMe) {
  setMeProp(_me, "m_iSync", (lingoTruthy(meProp(_me, "m_iSync")) ? 0 : 1));
  callMethod("arrangeParts", _me)
  if (meProp(_me, "m_iSync")) {
  callMethod("prepare", _me)
  } else {
  callMethod("render", _me)
  var t_Img = callNamed("image", meProp(_me, "m_iCanvasWidth"), meProp(_me, "m_iCanvasHeight"), 32);
  callMethod("fill", t_Img, t_Img.rect, callNamed("rgb", 0, 0, 0))
  var t_rAlpha = callNamed("image", meProp(_me, "m_iCanvasWidth"), meProp(_me, "m_iCanvasHeight"), 8, symbol("grayscale"));
  var t_rDestRect = callNamed("rect", 10, 40, 70, 160);
  callMethod("copyPixels", t_Img, meProp(_me, "m_imgBuffer"), t_rDestRect, meProp(_me, "m_imgBuffer").rect, lingoBinary("eq", symbol("useFastQuads"), 1))
  callMethod("copyPixels", t_rAlpha, meProp(_me, "m_rAlpha"), t_rDestRect, meProp(_me, "m_rAlpha").rect, lingoBinary("eq", symbol("useFastQuads"), 1))
  callMethod("setAlpha", t_Img, t_rAlpha)
  setThePropOf(t_Img, "useAlpha", 1);
  if (meProp(_me, "m_bFlipped")) {
  callMethod("flipImage", _me, t_Img)
  }

  return meProp(_me, "m_imgBuffer");
  }

}

