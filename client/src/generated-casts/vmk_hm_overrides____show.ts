// vmk_hm_overrides.cct /  / show

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function show(_me: LingoMe) {
  if (lingoBinary("neq", callNamed("getWindow", _me.m_sWindowName), 0)) {
  callMethod("show", callNamed("getWindow", _me.m_sWindowName))
  } else {
  callMethod("InitWindow", _me)
  }

}

