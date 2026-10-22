// vmk_minigame.cct / CGameComponent / _SetPooledAllocationModel

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _SetPooledAllocationModel(_me: LingoMe) {
  /* global */ var g_profMGEngine = globalVar("g_profMGEngine");
  /* global */ var g_profMGEProcess = globalVar("g_profMGEProcess");
  if (callNamed("voidp", meProp(_me, "m_rObjectPool"))) {
  setMeProp(_me, "m_rObjectPool", callNamed("createObject", "MGEObjectPool", "CRoomObjectManager"));
  }

  setMeProp(_me, "m_iAllocationModel", symbol("pooled"));
}

