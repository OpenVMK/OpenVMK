// 2230483a2e5366aa24e52c1b02d9674c.cct /  / handle_userdata

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handle_userdata(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  /* global */ var g_rCore = globalVar("g_rCore");
  var t_sUsername = callMethod("GetStrFrom", a_rMsg.connection);
  callMethod("set", callNamed("getObject", symbol("session")), "name", t_sUsername)
  callMethod("set", callNamed("getObject", symbol("session")), "IsTrading", 0)
  callMethod("set", callNamed("getObject", symbol("session")), "traderequests", 1)
  callNamed("executeMessage", symbol("ui_show"))
}

