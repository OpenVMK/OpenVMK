// vmk_casual.cct / CCasualGameManager / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_mp_iGameID_iCode", new LingoPropList([]));
  setMeProp(_me, "m_mp_iCode_rModule", new LingoPropList([]));
  setMeProp(_me, "m_mp_sType_rDialog", new LingoPropList([]));
  callNamed("registerMessage", "register_game_module", callMethod("getID", _this), symbol("RegisterGameModule"))
  callNamed("registerMessage", "unregister_game_module", callMethod("getID", _this), symbol("UnregisterGameModule"))
  callNamed("registerMessage", "acquire_game_module", callMethod("getID", _this), symbol("AcquireGameModule"))
  callNamed("registerMessage", "casual_game_interface", callMethod("getID", _this), symbol("ShowInterface"))
  callNamed("registerMessage", "room_leave", callMethod("getID", _this), symbol("RemoveDialogs"))
  callMethod("_RegisterServerMessageHandlers", _this, 1)
  return 1;
}

