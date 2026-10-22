// minigame_engine_overrides.cct / CGameComponent / _ClearTurnBuffer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ClearTurnBuffer(_me: LingoMe) {
  for (var tTurn of _me.m_ar_turnBuffer.toArray()) {
  if ((lingoTruthy(callNamed("voidp", tTurn)) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", tTurn))
  }

  }

  setThePropOf(_me, "m_ar_turnBuffer", new LingoList([]));
}

