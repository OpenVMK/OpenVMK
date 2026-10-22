// minigame_engine.cct / CGameComponent / _CreateMyObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _CreateMyObject(_me: LingoMe, i_sName: LingoValue, i_params: LingoValue) {
  /* global */ var g_profMGEngine = globalVar("g_profMGEngine");
  /* global */ var g_profMGEProcess = globalVar("g_profMGEProcess");
  if (lingoBinary("eq", callMethod("getaProp", meProp(_me, "m_mp_objects"), i_params[symbol("ref")]), undefined)) {
  var tObject = callMethod("_MinigameCreateObject", _me, i_sName, i_params);
  callMethod("addProp", meProp(_me, "m_mp_objects"), i_params[symbol("ref")], tObject)
  if (lingoBinary("eq", meProp(_me, "m_mp_objects").count, 1)) {
  callMethod("sort", meProp(_me, "m_mp_objects"))
  }

  callMethod("append", meProp(_me, "m_ar_rMyObjects"), tObject)
  callMethod("append", meProp(_me, "m_ar_ar_objByType")[i_params[symbol("type")]], tObject)
  }

}

