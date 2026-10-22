// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorToolHandler / regMsgList

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
  callMethod("setaProp", tMsgs, 2211, symbol("CallAssignedToModerator"))
  callMethod("setaProp", tMsgs, 2213, symbol("ReceiveModConversation"))
  callMethod("setaProp", tMsgs, 2214, symbol("CallClosed"))
  callMethod("setaProp", tMsgs, 2230, symbol("ModerationConfirmation"))
  callMethod("setaProp", tMsgs, 2584, symbol("PublicRoomInfo"))
  callMethod("setaProp", tMsgs, 2587, symbol("GuestRoomInfo"))
  var tCmds = new LingoPropList([]);
  callMethod("setaProp", tCmds, "initializeorwell", 200)
  callMethod("setaProp", tCmds, "SendMessageToModerator", 215)
  callMethod("setaProp", tCmds, "SendAlertToUser", 240)
  callMethod("setaProp", tCmds, "SendAlertToRoom", 244)
  callMethod("setaProp", tCmds, "KickUsers", 242)
  callMethod("setaProp", tCmds, "KickRoom", 246)
  callMethod("setaProp", tCmds, "BanUser", 243)
  callMethod("setaProp", tCmds, "BanRoom", 247)
  callMethod("setaProp", tCmds, "MuteUser", 241)
  callMethod("setaProp", tCmds, "UnmuteUser", 252)
  callMethod("setaProp", tCmds, "MuteRoom", 245)
  callMethod("setaProp", tCmds, "UnmuteRoom", 253)
  callMethod("setaProp", tCmds, "ForceNameChange", 792)
  callMethod("setaProp", tCmds, "AlertQueue", 814)
  if (tBool) {
  callNamed("registerListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _this), tMsgs)
  callNamed("registerCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _this), tCmds)
  } else {
  callNamed("unregisterListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _this), tMsgs)
  callNamed("unregisterCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _this), tCmds)
  }

}

