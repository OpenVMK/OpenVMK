// 1d7a323290934c002c579db2d87d7992.cct / CHiddenMickeyHandler / regMsgList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function regMsgList(_me: LingoMe, tBool: LingoValue) {
  var tMsgs = new LingoPropList([]);
  callMethod("setaProp", tMsgs, 2510, symbol("LoginData"))
  callMethod("setaProp", tMsgs, 2770, symbol("MickeyInPicture"))
  callMethod("setaProp", tMsgs, 2771, symbol("HiddenMickeyQuestStatus"))
  callMethod("setaProp", tMsgs, 2773, symbol("SetActiveMickeyList"))
  var tCmds = new LingoPropList([]);
  callMethod("setaProp", tCmds, "CHECK_MICKEY_PICTURE", 770)
  callMethod("setaProp", tCmds, "SAVE_MICKEY_PICTURE", 771)
  callMethod("setaProp", tCmds, "REQUEST_QUEST_STATUS", 772)
  if (tBool) {
  callNamed("registerListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tMsgs)
  callNamed("registerCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tCmds)
  } else {
  callNamed("unregisterListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tMsgs)
  callNamed("unregisterCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tCmds)
  }

}

