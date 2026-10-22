// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CScale9Grid / setEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setEvent(_me: LingoMe, i_sEvent: LingoValue) {
  setMeProp(_me, "m_sEvent", i_sEvent);
}

