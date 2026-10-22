// d0e535313898676eb605277339b50f27.cct / CMagicMenu / regMsgList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function regMsgList(_me: LingoMe, _this: LingoValue, tBool: LingoValue) {
  var tMsgs = new LingoPropList([]);
  callMethod("setaProp", tMsgs, 2527, symbol("getAvailableMagic"))
  callMethod("setaProp", tMsgs, 2000, symbol("_GenericError"))
  callMethod("setaProp", tMsgs, 2591, symbol("_Close"))
  callMethod("setaProp", tMsgs, 2529, symbol("_RechargeCount"))
  var tCmds = new LingoPropList([]);
  callMethod("setaProp", tCmds, "QueryMagicFx", 527)
  callMethod("setaProp", tCmds, "ActivataMagicFx", 526)
  callMethod("setaProp", tCmds, "DeactivateMagicFx", 528)
  if (tBool) {
  callNamed("registerListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _this), tMsgs)
  callNamed("registerCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _this), tCmds)
  } else {
  callNamed("unregisterListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _this), tMsgs)
  callNamed("unregisterCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _this), tCmds)
  }

}

