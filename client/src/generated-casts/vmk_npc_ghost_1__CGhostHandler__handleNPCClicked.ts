// vmk_npc_ghost_1.cct / CGhostHandler / handleNPCClicked

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handleNPCClicked(_me: LingoMe, tMsg: LingoValue) {
  var tItemCode = callMethod("GetIntFrom", tMsg.connection);
  var tMessage = callMethod("GetStrFrom", tMsg.connection);
  var t = callNamed("createNPCDialogWindow", callMethod("getID", _me), "GhostNPCDialog", 1, 1);
  if (lingoBinary("neq", t, 0)) {
  var t_npcFoundMsg = lingoBinary("joinPad", callNamed("getText", "item.4006", "Phineas"), "Found!");
  callMethod("setText", t, tMessage, t_npcFoundMsg, "ghost1")
  callMethod("show", t)
  }

}

