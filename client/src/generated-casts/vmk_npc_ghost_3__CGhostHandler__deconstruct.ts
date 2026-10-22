// vmk_npc_ghost_3.cct / CGhostHandler / deconstruct

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
  var t_rList = new LingoPropList([]);
  callMethod("setaProp", t_rList, 2593, symbol("HandleRoomEvent"))
  callMethod("setaProp", t_rList, 2710, symbol("handleNPCClicked"))
  callNamed("unregisterListener", t_sID, callMethod("getID", _me), t_rList)
  callMethod("regMsgList", _me, 0)
  return 1;
}

