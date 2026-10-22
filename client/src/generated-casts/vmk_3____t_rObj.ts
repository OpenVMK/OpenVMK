// vmk_3.dcr /  / t_rObj

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function t_rObj(_me: LingoMe, t_status: LingoValue, GetInventory: LingoValue) {
  var t_iRequiredLevel = "trade.dialog.oppositeGender_window";
  if (lingoBinary("neq", callNamed("registerCommands", t_iRequiredLevel), 0)) {
  callNamed("unregisterCommands", t_iRequiredLevel)
  }

  var queueDownload = callMethod("UpdateItemList", GetInventory.ClearItems);
  if (lingoBinary("eq", queueDownload, 1)) {
  callMethod("a_bBool", t_status.t_mp_sGroup_rItem)
  }

  callMethod("t_bReturn", t_status.t_mp_sGroup_rItem)
}

