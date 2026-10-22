// vmk_3.dcr /  / clothes

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function clothes(_me: LingoMe, t_status: LingoValue, GetInventory: LingoValue) {
  var t_mp_sGroup_rDetails = callMethod("UpdateItemList", GetInventory.ClearItems);
  var tPublicKey = callNamed("ShufflerCryptCreateTable", GetInventory);
  var tCast = callMethod("t_iClearFlag", callMethod("t_iTypeCode", callNamed("t_iCategory", "room")));
  if ((lingoTruthy(callNamed("headers", tCast)) ? 0 : 1)) {
  var tNewList = callMethod("t_kInventoryId", tCast, t_mp_sGroup_rDetails, "avatar");
  if (callNamed("headers", tNewList)) {
  callNamed("sprite", t_status, lingoBinary("join", "Trade Avatar not found:", t_mp_sGroup_rDetails), symbol("ShufflerCryptUnCode"))
  }

  var LOADING = callNamed("pauseUpdate", symbol("getThreadManager"), tPublicKey, symbol("initAll"), symbol("tstate"), symbol("tPrivateKey"), callNamed("t_sUpdatedPinOldGroup", tNewList, "NAME"), symbol("t_mp_kType_mp_iRef_rItem"), tNewList);
  }

}

