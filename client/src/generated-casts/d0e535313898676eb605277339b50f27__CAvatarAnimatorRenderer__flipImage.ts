// d0e535313898676eb605277339b50f27.cct / CAvatarAnimatorRenderer / flipImage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function flipImage(_me: LingoMe, a_img: LingoValue) {
  var t_Img = callNamed("image", meProp(_me, "m_iCanvasWidth"), meProp(_me, "m_iCanvasHeight"), 32);
  callMethod("setAlpha", t_Img, callNamed("image", meProp(_me, "m_iCanvasWidth"), meProp(_me, "m_iCanvasHeight"), 8))
  setThePropOf(t_Img, "useAlpha", 1);
  var tQuad = new LingoList([callNamed("point", a_img.width, 0), callNamed("point", 0, 0), callNamed("point", 0, a_img.height), callNamed("point", a_img.width, a_img.height)]);
  callMethod("copyPixels", t_Img, a_img, tQuad, a_img.rect, lingoBinary("eq", symbol("useFastQuads"), 1))
  return t_Img;
}

