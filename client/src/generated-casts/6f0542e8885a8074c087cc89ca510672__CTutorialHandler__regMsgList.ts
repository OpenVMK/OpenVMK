// 6f0542e8885a8074c087cc89ca510672.cct / CTutorialHandler / regMsgList

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
  callMethod("setaProp", tMsgs, 2543, symbol("ListenToMessageReceived"))
  callMethod("setaProp", tMsgs, 2544, symbol("ListenToFriendRequest"))
  callMethod("setaProp", tMsgs, 2584, symbol("ListenToGuestArea"))
  callMethod("setaProp", tMsgs, 2587, symbol("ListenToGuestRoom"))
  callMethod("setaProp", tMsgs, 2594, symbol("ListenToTradeRequest"))
  callMethod("setaProp", tMsgs, 2020, symbol("shortcutnavigate"))
  var tCmds = new LingoPropList([]);
  if (tBool) {
  callNamed("registerListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tMsgs)
  callNamed("registerCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tCmds)
  } else {
  callNamed("unregisterListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tMsgs)
  callNamed("unregisterCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tCmds)
  }

}

