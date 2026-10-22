// minigame_engine_overrides.cct / CGameComponent / GetObjectPool

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetObjectPool(_me: LingoMe) {
  if (lingoBinary("eq", _me.m_iAllocationModel, symbol("pooled"))) {
  return _me.m_rObjectPool;
  } else {
  return undefined;
  }

}

