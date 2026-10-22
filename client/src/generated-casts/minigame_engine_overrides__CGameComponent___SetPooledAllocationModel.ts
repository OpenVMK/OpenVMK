// minigame_engine_overrides.cct / CGameComponent / _SetPooledAllocationModel

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _SetPooledAllocationModel(_me: LingoMe) {
  if (callNamed("voidp", _me.m_rObjectPool)) {
  setThePropOf(_me, "m_rObjectPool", callNamed("createObject", "MGEObjectPool", "CRoomObjectManager"));
  }

  setThePropOf(_me, "m_iAllocationModel", symbol("pooled"));
}

