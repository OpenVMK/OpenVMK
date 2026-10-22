// 2230483a2e5366aa24e52c1b02d9674c.cct / CGuestNavListItem / setState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setState(_me: LingoMe, a_bState: LingoValue) {
  if (callNamed("voidp", a_bState)) {
  setThePropOf(_me, "m_bState", a_bState);
  callNamed("ResolveImage", _me)
  callNamed("render", _me)
  }

  setThePropOf(_me, "m_bState", a_bState);
  callNamed("ResolveImage", _me)
  callNamed("render", _me)
  return 1;
}

