// minigame_engine_overrides.cct / CGameComponent / _EndStage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EndStage(_me: LingoMe, i_iTimeToStart: LingoValue, i_ar_params: LingoValue) {
  callMethod("OnEndStage", _me.m_rHandler, i_iTimeToStart, i_ar_params)
}

