// minigame_engine_overrides.cct / CGameComponent / _MinigameLeave

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _MinigameLeave(_me: LingoMe) {
  if ((lingoTruthy(callNamed("voidp", _me.m_rRoomContext)) ? 0 : 1)) {
  callMethod("OnLeave", _me.m_rHandler)
  }

}

