// vmk_domestic.cct /  / regMsgList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function regMsgList(_me: LingoMe, _this: LingoValue, tBool: LingoValue) {
  callNamed("trace", "regMsgList()")
  var tMsgs = new LingoPropList([]);
  callMethod("setaProp", tMsgs, 3000, symbol("handle_createpet"))
  callMethod("setaProp", tMsgs, 3001, symbol("handle_petstatus"))
  callMethod("setaProp", tMsgs, 3002, symbol("handle_petchat"))
  callMethod("setaProp", tMsgs, 3003, symbol("handle_removepet"))
  var tCmds = new LingoPropList([]);
  callMethod("setaProp", tCmds, "CLICKPET", 3000)
  if (tBool) {
  callNamed("registerListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _this), tMsgs)
  callNamed("registerCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _this), tCmds)
  } else {
  callNamed("unregisterListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _this), tMsgs)
  callNamed("unregisterCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _this), tCmds)
  }

  callNamed("trace", "end regMsgList()")
}

