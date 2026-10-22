// vmk_sound.cct / CSoundHandler / GetSoundSettings

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetSoundSettings(_me: LingoMe, tMsg: LingoValue) {
  if (callNamed("objectExists", symbol("session"))) {
  callMethod("set", callNamed("getObject", symbol("session")), "fx", callMethod("GetIntFrom", tMsg.connection))
  callMethod("set", callNamed("getObject", symbol("session")), "music", callMethod("GetIntFrom", tMsg.connection))
  callMethod("set", callNamed("getObject", symbol("session")), "ui", callMethod("GetIntFrom", tMsg.connection))
  callMethod("set", callNamed("getObject", symbol("session")), "volume", callMethod("GetIntFrom", tMsg.connection))
  var t_iTutorialState = callMethod("GetIntFrom", tMsg.connection);
  callMethod("set", callNamed("getObject", symbol("session")), "tutorial", t_iTutorialState)
  var t_iTradeState = callMethod("GetIntFrom", tMsg.connection);
  var t_iFriendState = callMethod("GetIntFrom", tMsg.connection);
  callMethod("set", callNamed("getObject", symbol("session")), "traderequests", t_iTradeState)
  callMethod("set", callNamed("getObject", symbol("session")), "friendrequests", t_iFriendState)
  callNamed("executeMessage", symbol("set_tutorials_state"), t_iTutorialState)
  callNamed("executeMessage", "ResetRoomSound")
  callNamed("executeMessage", "ResetFXChannels")
  }

}

