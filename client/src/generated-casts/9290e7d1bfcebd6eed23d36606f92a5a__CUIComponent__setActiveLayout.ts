// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CUIComponent / setActiveLayout

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setActiveLayout(_me: LingoMe, a_rLayout: LingoValue) {
  callMethod("setActiveLayout", meProp(_me, "m_rParent"), a_rLayout)
}

