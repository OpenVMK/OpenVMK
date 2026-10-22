// d0e535313898676eb605277339b50f27.cct / CAvatarRendererBU / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe) {
  if ((lingoTruthy(meProp(_me, "m_bChanges")) ? 0 : 1)) {
  return;
  }

  setMeProp(_me, "m_bChanges", 0);
  callMethod("arrangeParts", _me)
  setMeProp(_me, "pUpdateRect", callNamed("rect", 0, 0, 0, 0));
  setMeProp(_me, "m_rAlpha", callNamed("image", meProp(_me, "m_iCanvasWidth"), meProp(_me, "m_iCanvasHeight"), 8, symbol("grayscale")));
  setMeProp(_me, "m_imgBuffer", callNamed("image", meProp(_me, "m_iCanvasWidth"), meProp(_me, "m_iCanvasHeight"), 32));
  callMethod("fill", meProp(_me, "m_imgBuffer"), meProp(_me, "m_imgBuffer").rect, callNamed("rgb", 0, 0, 0))
  setThePropOf(meProp(_me, "m_imgBuffer"), "useAlpha", 0);
  callNamed("call", symbol("update"), meProp(_me, "m_mpSortedParts"))
  callMethod("setAlpha", meProp(_me, "m_imgBuffer"), meProp(_me, "m_rAlpha"))
  setThePropOf(meProp(_me, "m_imgBuffer"), "useAlpha", 1);
  if (lingoBinary("neq", meProp(_me, "m_iTileSize"), 32)) {
  var t_iRatio = lingoBinary("div", callNamed("float", meProp(_me, "m_iTileSize")), float(32));
  var t_Img = callNamed("image", meProp(_me, "m_iCanvasWidth"), meProp(_me, "m_iCanvasHeight"), 32);
  var t_iRect1 = lingoBinary("sub", meProp(_me, "m_iCanvasWidth"), lingoBinary("div", lingoBinary("mul", meProp(_me, "m_iCanvasWidth"), t_iRatio), 2));
  var t_iRect2 = lingoBinary("sub", meProp(_me, "m_iCanvasHeight"), lingoBinary("mul", meProp(_me, "m_iCanvasHeight"), t_iRatio));
  var t_iRect3 = lingoBinary("sub", meProp(_me, "m_iCanvasWidth"), t_iRect1);
  var t_rDestRect = callNamed("rect", t_iRect1, t_iRect2, t_iRect3, meProp(_me, "m_iCanvasHeight"));
  callMethod("copyPixels", t_Img, meProp(_me, "m_imgBuffer"), t_rDestRect, meProp(_me, "m_imgBuffer").rect, lingoBinary("eq", symbol("useFastQuads"), 1))
  return t_Img;
  }

  return meProp(_me, "m_imgBuffer");
}

