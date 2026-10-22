// 2230483a2e5366aa24e52c1b02d9674c.cct / CMessengerHandler / regMsgList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function regMsgList(_me: LingoMe, tBool: LingoValue) {
  var tMsgs = callNamed("propList");
  callNamed("setaProp", tMsgs, 2540, symbol("MessengerReady"))
  callNamed("setaProp", tMsgs, 2541, symbol("friendlist"))
  callNamed("setaProp", tMsgs, 2542, symbol("FriendlistUpdate"))
  callNamed("setaProp", tMsgs, 2543, symbol("InstantmessageReceived"))
  callNamed("setaProp", tMsgs, 2544, symbol("FriendshipRequested"))
  callNamed("setaProp", tMsgs, 2545, symbol("AddFriend"))
  callNamed("setaProp", tMsgs, 2546, symbol("removeFriend"))
  callNamed("setaProp", tMsgs, 2547, symbol("AvatarInfo"))
  callNamed("setaProp", tMsgs, 2548, symbol("AdminMessage"))
  callNamed("setaProp", tMsgs, 2549, symbol("AdminResourceMessage"))
  callNamed("setaProp", tMsgs, 2550, symbol("AddFriendFailed"))
  callNamed("setaProp", tMsgs, 2551, symbol("ReinitializeMessenger"))
  var tCmds = callNamed("propList");
  if (tBool) {
  callNamed("registerListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tMsgs)
  callNamed("registerCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tCmds)
  } else {
  callNamed("unregisterListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tMsgs)
  }

  callNamed("unregisterCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tCmds)
}

