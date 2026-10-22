// minigame_engine_overrides.cct / CGameComponent / _TurnBufferState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _TurnBufferState(_me: LingoMe) {
  if (lingoBinary("gt", _me.m_ar_turnBuffer.count, 1)) {
  return symbol("overfill");
  }

  if (lingoBinary("eq", _me.m_ar_turnBuffer.count, 1)) {
  return symbol("ready");
  }

  if (lingoBinary("eq", _me.m_ar_turnBuffer.count, 0)) {
  return symbol("empty");
  }

}

