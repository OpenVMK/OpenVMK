// minigame_engine_overrides.cct / CGameComponent / _GameInfoUpdate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _GameInfoUpdate(_me: LingoMe, a_rInput: LingoValue) {
  callMethod("OnGameInfoUpdate", _me.m_rHandler, a_rInput)
}

