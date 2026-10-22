// minigame_engine.cct / CGameComponent / _SetSimpleAllocationModel

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _SetSimpleAllocationModel(_me: LingoMe) {
  /* global */ var g_profMGEngine = globalVar("g_profMGEngine");
  /* global */ var g_profMGEProcess = globalVar("g_profMGEProcess");
  setMeProp(_me, "m_iAllocationModel", symbol("simple"));
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rObjectPool"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rObjectPool")))
  setMeProp(_me, "m_rObjectPool", undefined);
  }

}

