// d0e535313898676eb605277339b50f27.cct / CAvatarAnimatorRenderer / reDraw

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function reDraw(_me: LingoMe) {
  setMeProp(_me, "m_rAlpha", callNamed("image", meProp(_me, "m_iCanvasWidth"), meProp(_me, "m_iCanvasHeight"), 8, symbol("grayscale")));
  setMeProp(_me, "m_imgBuffer", callNamed("image", meProp(_me, "m_iCanvasWidth"), meProp(_me, "m_iCanvasHeight"), 32));
  callMethod("fill", meProp(_me, "m_imgBuffer"), meProp(_me, "m_imgBuffer").rect, callNamed("rgb", 0, 0, 0))
  callMethod("arrangeParts", _me)
  callNamed("call", symbol("render"), meProp(_me, "m_mpSortedParts"))
}

