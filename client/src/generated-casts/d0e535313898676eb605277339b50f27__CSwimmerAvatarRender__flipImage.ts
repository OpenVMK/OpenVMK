// d0e535313898676eb605277339b50f27.cct / CSwimmerAvatarRender / flipImage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function flipImage(_me: LingoMe, a_rImg: LingoValue) {
  var t_rImg = callNamed("image", meProp(_me, "m_iCanvasWidth"), meProp(_me, "m_iCanvasHeight"), 32);
  callMethod("setAlpha", t_rImg, callNamed("image", meProp(_me, "m_iCanvasWidth"), meProp(_me, "m_iCanvasHeight"), 8))
  setThePropOf(t_rImg, "useAlpha", 1);
  var tQuad = new LingoList([callNamed("point", a_rImg.width, 0), callNamed("point", 0, 0), callNamed("point", 0, a_rImg.height), callNamed("point", a_rImg.width, a_rImg.height)]);
  callMethod("copyPixels", t_rImg, a_rImg, tQuad, a_rImg.rect, new LingoPropList([symbol("useFastQuads"), 1]))
  return t_rImg;
}

