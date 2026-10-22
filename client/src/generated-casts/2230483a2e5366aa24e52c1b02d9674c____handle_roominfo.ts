// 2230483a2e5366aa24e52c1b02d9674c.cct /  / handle_roominfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handle_roominfo(_me: LingoMe, a_rMsg: LingoValue) {
  /* global */ var g_rCore = globalVar("g_rCore");
  var t_rInput = a_rMsg.connection;
  var t_ar_Msg = callNamed("propList");
  callNamed("setAt", t_ar_Msg, symbol("roomName"), callMethod("GetStrFrom", t_rInput))
  callNamed("setAt", t_ar_Msg, symbol("roomOwner"), callMethod("GetStrFrom", t_rInput))
  callNamed("setAt", t_ar_Msg, symbol("roomDescription"), callMethod("GetStrFrom", t_rInput))
  callNamed("setAt", t_ar_Msg, symbol("controlRoom"), callMethod("GetIntFrom", t_rInput))
  callNamed("setAt", t_ar_Msg, symbol("friendsOnly"), callMethod("GetIntFrom", t_rInput))
  callMethod("setGuestInfo", callNamed("getObject", symbol("roominfo_component")), t_ar_Msg)
  callMethod("setPrivate", callNamed("getObject", symbol("roominfo_component")))
  callMethod("SaveOriginalData", callNamed("getObject", symbol("roominfo_interface")), t_ar_Msg[symbol("roomName")], t_ar_Msg[symbol("roomDescription")])
  callMethod("set", callNamed("getObject", symbol("session")), "RoomType", symbol("private"))
  callMethod("set", callNamed("getObject", symbol("session")), "ControlRoom", t_ar_Msg.controlRoom)
}

