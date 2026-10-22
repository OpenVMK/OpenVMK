// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoHandler / regMsgList

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
  callMethod("setaProp", tMsgs, 2584, symbol("PublicRoomInfoMessage"))
  callMethod("setaProp", tMsgs, 2587, symbol("GuestRoomInfoMessage"))
  callMethod("setaProp", tMsgs, 2730, symbol("MonorailEvent"))
  callMethod("setaProp", tMsgs, 2796, symbol("GuestRoomInfoUpdate"))
  callMethod("setaProp", tMsgs, 2884, symbol("GuestRoomEntryStateUpdate"))
  callMethod("setaProp", tMsgs, 2812, symbol("ConfirmClearRoomRequest"))
  callMethod("setaProp", tMsgs, 2000, symbol("NameError"))
  var tCmds = new LingoPropList([]);
  callMethod("setaProp", tCmds, "CreateRoomTicket", 533)
  callMethod("setaProp", tCmds, "RequestTicketInventory", 534)
  callMethod("setaProp", tCmds, "SendFriendsOnlyState", 598)
  callMethod("setaProp", tCmds, "ClearRoomItems", 812)
  if (tBool) {
  callNamed("registerListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tMsgs)
  callNamed("registerCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tCmds)
  } else {
  callNamed("unregisterListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tMsgs)
  callNamed("unregisterCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tCmds)
  }

}

