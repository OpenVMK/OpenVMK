// vmk_casual.cct / CCasualGameManager / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  callMethod("_RegisterServerMessageHandlers", _this, 0)
  callMethod("RemoveDialogs", _this)
  callNamed("unregisterMessage", "register_game_module", callMethod("getID", _this))
  callNamed("unregisterMessage", "unregister_game_module", callMethod("getID", _this))
  callNamed("unregisterMessage", "acquire_game_module", callMethod("getID", _this))
  callNamed("unregisterMessage", "casual_game_interface", callMethod("getID", _this))
  callNamed("unregisterMessage", "room_leave", callMethod("getID", _this))
  setMeProp(_me, "m_mp_iGameID_iCode", undefined);
  setMeProp(_me, "m_mp_iCode_rModule", undefined);
  return 1;
}

