// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorToolHandler / ReceiveModConversation

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ReceiveModConversation(_me: LingoMe, _this: LingoValue, a_mpMsg: LingoValue) {
  var t_mp_data = new LingoPropList([]);
  callMethod("addProp", t_mp_data, symbol("id"), callMethod("GetIntFrom", a_mpMsg.connection))
  callMethod("addProp", t_mp_data, symbol("name"), callMethod("GetStrFrom", a_mpMsg.connection))
  callMethod("addProp", t_mp_data, symbol("message"), callMethod("GetStrFrom", a_mpMsg.connection))
  callMethod("addProp", t_mp_data, symbol("Response"), callMethod("GetIntFrom", a_mpMsg.connection))
  callMethod("ManageModWindows", _this._interface, "mod_message", t_mp_data)
}

