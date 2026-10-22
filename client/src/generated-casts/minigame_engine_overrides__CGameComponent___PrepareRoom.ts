// minigame_engine_overrides.cct / CGameComponent / _PrepareRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _PrepareRoom(_me: LingoMe, tRoomCode: LingoValue) {
  callMethod("OnPrepareRoom", _me.m_rHandler)
}

