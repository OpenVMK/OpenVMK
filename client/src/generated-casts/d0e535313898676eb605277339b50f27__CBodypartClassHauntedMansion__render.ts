// d0e535313898676eb605277339b50f27.cct / CBodypartClassHauntedMansion / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe) {
  var t_rCacheData = meProp(_me, "m_rImageCache")[meProp(_me, "m_sMem")];
  if ((lingoTruthy(callNamed("voidp", t_rCacheData)) ? 0 : 1)) {
  callMethod("copyPixels", _me.m_imgBuffer, meProp(_me, "m_rCacheRectB"), meProp(_me, "m_rCacheRectA"), meProp(_me, "m_rCacheRectB"), meProp(_me, "m_mpDrawProps"))
  }

}

