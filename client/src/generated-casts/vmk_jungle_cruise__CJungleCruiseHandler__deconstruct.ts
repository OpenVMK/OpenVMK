// vmk_jungle_cruise.cct / CJungleCruiseHandler / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  var t_sID = callNamed("getVariable", "main.connection.id", "VMK");
  var tMsgs = new LingoPropList([]);
  callMethod("setaProp", tMsgs, 2505, symbol("HandleAvatarInfo"))
  var tCmds = new LingoPropList([]);
  callMethod("setaProp", tCmds, "REQUESTDATA", 505)
  callNamed("unregisterListener", t_sID, callMethod("getID", _me), tMsgs)
  callNamed("unregisterCommands", t_sID, callMethod("getID", _me), tCmds)
  return 1;
}

