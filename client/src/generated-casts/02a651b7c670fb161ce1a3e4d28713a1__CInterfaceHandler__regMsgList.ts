// 02a651b7c670fb161ce1a3e4d28713a1.cct / CInterfaceHandler / regMsgList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function regMsgList(_me: LingoMe, tBool: LingoValue) {
  var tConnection = callNamed("getVariable", "main.connection.id", "VMK");
  var tMsgs = new LingoPropList([]);
  callMethod("setaProp", tMsgs, 2762, symbol("CameraStatus"))
  callMethod("setaProp", tMsgs, 2561, symbol("ChatAvatarMuted"))
  var tCmds = new LingoPropList([]);
  callMethod("setaProp", tCmds, "QUERY_CAMERA", 767)
  if (tBool) {
  callNamed("registerListener", tConnection, callMethod("getID", _me), tMsgs)
  callNamed("registerCommands", tConnection, callMethod("getID", _me), tCmds)
  } else {
  callNamed("unregisterListener", tConnection, callMethod("getID", _me), tMsgs)
  callNamed("unregisterCommands", tConnection, callMethod("getID", _me), tCmds)
  }

}

