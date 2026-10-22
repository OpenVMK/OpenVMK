// 239fb1d2675fc448140198b03238814c.cct / CMainHandler / regMsgList

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
  callMethod("setaProp", tMsgs, -float(1), symbol("_ConnectionLost"))
  callMethod("setaProp", tMsgs, 2000, symbol("_GenericError"))
  callMethod("setaProp", tMsgs, 2001, symbol("connectionReady"))
  callMethod("setaProp", tMsgs, 2011, symbol("_ConnectionDropped"))
  callMethod("setaProp", tMsgs, 2012, symbol("_InactivityAlert"))
  callMethod("setaProp", tMsgs, 2002, symbol("_Hello"))
  callMethod("setaProp", tMsgs, 2018, symbol("RemoveLoginWindow"))
  callMethod("setaProp", tMsgs, 2240, symbol("_AdminMessage"))
  var tCmds = new LingoPropList([]);
  callMethod("setaProp", tCmds, "login", 10)
  callMethod("setaProp", tCmds, "activeresponse", 12)
  callMethod("setaProp", tCmds, "init", 540)
  if (tBool) {
  callNamed("registerListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _this), tMsgs)
  callNamed("registerCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _this), tCmds)
  } else {
  callNamed("unregisterListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _this), tMsgs)
  callNamed("unregisterCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _this), tCmds)
  }

}

