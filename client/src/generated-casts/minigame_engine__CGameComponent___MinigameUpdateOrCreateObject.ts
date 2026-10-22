// minigame_engine.cct / CGameComponent / _MinigameUpdateOrCreateObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _MinigameUpdateOrCreateObject(_me: LingoMe, i_ref: LingoValue, i_params: LingoValue) {
  /* global */ var g_profMGEngine = globalVar("g_profMGEngine");
  /* global */ var g_profMGEProcess = globalVar("g_profMGEProcess");
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rRoomContext"))) ? 0 : 1)) {
  var tObject = callMethod("getaProp", meProp(_me, "m_mp_objects"), i_ref);
  if (callNamed("voidp", tObject)) {
  callMethod("_CreateObject", _me, lingoBinary("join", "MGO:", i_params[symbol("ref")]), i_params)
  } else {
  callMethod("SetParam", tObject, "Owner", i_params[symbol("owner")])
  callMethod("SetParam", tObject, "Team", i_params[symbol("team")])
  callMethod("SetParam", tObject, "WorldPosition", i_params[symbol("worldpos")])
  callMethod("SetParam", tObject, "Direction", i_params[symbol("dir")])
  callMethod("SetParam", tObject, "GameParams", callMethod("duplicate", i_params[symbol("extra")]))
  callMethod("UpdateParameters", callMethod("GetFactor", tObject), i_params[symbol("extra")])
  }

  }

}

