// vmk_hm_overrides.cct / CHMWindowUI / hide

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function hide(_me: LingoMe) {
  if (lingoBinary("neq", callNamed("getWindow", _me.m_sWindowName), 0)) {
  callNamed("removeWindow", _me.m_sWindowName)
  }

  setThePropOf(_me, "m_bActive", 0);
}

