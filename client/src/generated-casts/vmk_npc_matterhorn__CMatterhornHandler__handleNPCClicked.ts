// vmk_npc_matterhorn.cct / CMatterhornHandler / handleNPCClicked

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
  var t = callNamed("createNPCDialogWindow", callMethod("getID", _me), "YetiNPCDialog", 1, 1);
  if (lingoBinary("neq", t, 0)) {
  callMethod("setText", t, tMessage, "Yeti Found!", "yeti")
  callMethod("show", t)
  }

}

