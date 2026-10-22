// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessyCheeseStuff / regMsgList

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
  callMethod("setaProp", tMsgs, 2540, symbol("MessengerReady"))
  callMethod("setaProp", tMsgs, 2541, symbol("friendlist"))
  callMethod("setaProp", tMsgs, 2542, symbol("FriendlistUpdate"))
  callMethod("setaProp", tMsgs, 2543, symbol("InstantmessageReceived"))
  callMethod("setaProp", tMsgs, 2544, symbol("FriendshipRequested"))
  callMethod("setaProp", tMsgs, 2545, symbol("AddFriend"))
  callMethod("setaProp", tMsgs, 2546, symbol("removeFriend"))
  callMethod("setaProp", tMsgs, 2547, symbol("AvatarInfo"))
  callMethod("setaProp", tMsgs, 2548, symbol("AdminMessage"))
  callMethod("setaProp", tMsgs, 2549, symbol("AdminResourceMessage"))
  callMethod("setaProp", tMsgs, 2550, symbol("AddFriendFailed"))
  callMethod("setaProp", tMsgs, 2551, symbol("ReinitializeMessenger"))
  var tCmds = new LingoPropList([]);
  if (tBool) {
  callNamed("registerListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tMsgs)
  callNamed("registerCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tCmds)
  } else {
  callNamed("unregisterListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tMsgs)
  callNamed("unregisterCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tCmds)
  }

}

