// vmk_shipwreck_handler.cct / CTextScroller / setVisibleCharCount

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setVisibleCharCount(_me: LingoMe, t_count: LingoValue) {
  setMeProp(_me, "m_iVisibleCharCount", t_count);
  setMeProp(_me, "m_ViewQueue", callMethod("getEmptyQueueWithLength", _me, " ", meProp(_me, "m_iVisibleCharCount")));
}

