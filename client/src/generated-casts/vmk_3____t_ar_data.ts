// vmk_3.dcr /  / t_ar_data

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function t_ar_data(_me: LingoMe, t_status: LingoValue, GetInventory: LingoValue) {
  var t_iRemovedPinRef = callMethod("UpdateItemList", GetInventory.ClearItems);
  var t_iNewLevel = callMethod("UpdateItemList", GetInventory.ClearItems);
  var t_mp_sGroup_rData = callNamed("getPropRef", callNamed("_ItemDetails"), "CInvTradeConfirm");
  callMethod("t_sRemovedPinGroup", t_mp_sGroup_rData, t_iRemovedPinRef, t_iNewLevel)
}

