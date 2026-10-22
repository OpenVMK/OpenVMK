// vmk_3.dcr /  / t_sObjectID

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function t_sObjectID(_me: LingoMe, t_status: LingoValue, GetInventory: LingoValue) {
  var t_mp_sGroup_rDetails = callMethod("UpdateItemList", GetInventory.ClearItems);
  var t_mp_iRef_rItem_Own = callMethod("UpdateItemList", GetInventory.ClearItems);
  var t_rHerSet = callMethod("UpdateItemList", GetInventory.ClearItems);
  callMethod("t_iPinLevel", callMethod("t_rOwnSet", t_status), t_mp_sGroup_rDetails, t_mp_iRef_rItem_Own, t_rHerSet)
}

