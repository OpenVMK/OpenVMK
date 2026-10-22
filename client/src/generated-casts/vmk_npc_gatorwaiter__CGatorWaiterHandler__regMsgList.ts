// vmk_npc_gatorwaiter.cct / CGatorWaiterHandler / regMsgList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function regMsgList(_me: LingoMe, tBool: LingoValue) {
  var t_sID = callNamed("getVariable", "main.connection.id", "VMK");
  var tMsgs = new LingoPropList([]);
  callMethod("setaProp", tMsgs, 2586, symbol("_CreateElements"))
  callMethod("setaProp", tMsgs, 2599, symbol("elementUpdate"))
  callMethod("setaProp", tMsgs, 2710, symbol("handleNPCClicked"))
  var tCmds = new LingoPropList([]);
  if (tBool) {
  callNamed("registerListener", t_sID, callMethod("getID", _me), tMsgs)
  callNamed("registerCommands", t_sID, callMethod("getID", _me), tCmds)
  } else {
  callNamed("unregisterListener", t_sID, callMethod("getID", _me), tMsgs)
  callNamed("unregisterCommands", t_sID, callMethod("getID", _me), tCmds)
  }

}

