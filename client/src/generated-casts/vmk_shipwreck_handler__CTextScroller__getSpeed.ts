// vmk_shipwreck_handler.cct / CTextScroller / getSpeed

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getSpeed(_me: LingoMe) {
  return lingoBinary("div", 1000, meProp(_me, "m_iSpeed"));
}

