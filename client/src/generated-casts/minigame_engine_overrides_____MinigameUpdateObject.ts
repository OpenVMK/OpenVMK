// minigame_engine_overrides.cct /  / _MinigameUpdateObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _MinigameUpdateObject(_me: LingoMe, i_ref: LingoValue, i_params: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", _me.m_rRoomContext)) ? 0 : 1)) {
  var tObject = callMethod("getaProp", _me.m_mp_objects, i_ref);
  callMethod("SetParam", tObject, "Owner", i_params[symbol("owner")])
  callMethod("SetParam", tObject, "Team", i_params[symbol("team")])
  callMethod("SetParam", tObject, "WorldPosition", i_params[symbol("worldpos")])
  callMethod("SetParam", tObject, "Direction", i_params[symbol("Dir")])
  callMethod("SetParam", tObject, "GameParams", callMethod("duplicate", i_params[symbol("extra")]))
  callMethod("UpdateParameters", callMethod("GetFactor", tObject), i_params[symbol("extra")])
  }

}

