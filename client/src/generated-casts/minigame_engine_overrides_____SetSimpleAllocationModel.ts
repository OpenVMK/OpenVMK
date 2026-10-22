// minigame_engine_overrides.cct /  / _SetSimpleAllocationModel

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _SetSimpleAllocationModel(_me: LingoMe) {
  setThePropOf(_me, "m_iAllocationModel", symbol("simple"));
  if ((lingoTruthy(callNamed("voidp", _me.m_rObjectPool)) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", _me.m_rObjectPool))
  setThePropOf(_me, "m_rObjectPool", undefined);
  }

}

