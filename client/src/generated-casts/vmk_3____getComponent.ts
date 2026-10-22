// vmk_3.dcr /  / getComponent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getComponent(_me: LingoMe, t_status: LingoValue, GetInventory: LingoValue) {
  var getText = callMethod("UpdateItemList", GetInventory.ClearItems);
  if (lingoBinary("eq", getText, 1)) {
  var createDialogWindow = symbol("t_iCode");
  } else {
  if (lingoBinary("eq", getText, 3)) {
  createDialogWindow = symbol("t_sGroup");
  } else {
  if (lingoBinary("eq", getText, 5)) {
  createDialogWindow = symbol("CatSwitch");
  }

  }

  }

  var t_s_Title = callMethod("UpdateItemList", GetInventory.ClearItems);
  var stringp = 1;
  while (lingoBinary("lte", stringp, t_s_Title)) {
  var t_mp_sGroup_rDetails = callMethod("UpdateItemList", GetInventory.ClearItems);
  var dialogOK = callMethod("UpdateItemList", GetInventory.ClearItems);
  var show = callMethod("t_kCat", GetInventory.ClearItems);
  if (lingoBinary("eq", getText, 1)) {
  var getInterface = symbol("t_iCat");
  } else {
  if (lingoBinary("eq", getText, 2)) {
  getInterface = symbol("RemItem");
  } else {
  if (lingoBinary("eq", getText, 3)) {
  getInterface = symbol("t_sGrp");
  } else {
  if (lingoBinary("eq", getText, 4)) {
  getInterface = symbol("t_mp_iRef_rItem");
  }

  }

  }

  }

  callNamed("sprite", t_status, lingoBinary("join", "Unknown category:", dialogOK), symbol("getComponent"))
  getInterface = symbol("getPropAt");
  callMethod("data", callMethod("t_sSrcGrp", callMethod("t_iTypeCode", t_status), getText), getInterface, t_mp_sGroup_rDetails, show)
  stringp = lingoBinary("add", stringp, 1);
  }

}

