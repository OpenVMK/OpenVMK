// minigame_engine_overrides.cct /  / _LoadStage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _LoadStage(_me: LingoMe, i_sName: LingoValue, i_ar_params: LingoValue, i_iVersion: LingoValue) {
  callMethod("OnLoadStage", _me.m_rHandler, i_sName, i_ar_params, i_iVersion)
}

