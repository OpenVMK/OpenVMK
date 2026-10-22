// minigame_engine_overrides.cct / CGameComponent / GetMGObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetMGObject(_me: LingoMe, i_iRef: LingoValue) {
  return callMethod("getaProp", _me.m_mp_objects, i_iRef);
}

