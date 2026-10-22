// vmk_npc_gatorwaiter.cct / CGatorWaiterHandler / handleNPCClicked

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
  var t = callNamed("createNPCDialogWindow", callMethod("getID", _me), "GatorWaiterNPCDialog", 1, 1);
  if (lingoBinary("neq", t, 0)) {
  var t_npcFoundMsg = lingoBinary("joinPad", callNamed("getText", "item.4009", "Gator Waiter"), "Found!");
  callMethod("setText", t, tMessage, t_npcFoundMsg, "Gator_Waiter")
  callMethod("show", t)
  }

}

