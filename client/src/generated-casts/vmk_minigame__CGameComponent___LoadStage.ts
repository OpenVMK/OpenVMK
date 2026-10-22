// vmk_minigame.cct / CGameComponent / _LoadStage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _LoadStage(_me: LingoMe, i_sName: LingoValue, i_iVersion: LingoValue, i_ar_params: LingoValue) {
  /* global */ var g_profMGEngine = globalVar("g_profMGEngine");
  /* global */ var g_profMGEProcess = globalVar("g_profMGEProcess");
  callMethod("OnLoadStage", meProp(_me, "m_rHandler"), i_sName, i_iVersion, i_ar_params)
}

