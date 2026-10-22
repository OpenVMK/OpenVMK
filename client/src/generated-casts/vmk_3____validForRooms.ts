// vmk_3.dcr /  / validForRooms

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function validForRooms(_me: LingoMe, t_status: LingoValue, GetInventory: LingoValue) {
  var t_mp_sKey_sValue = GetInventory.ClearItems;
  var t_iPrc = callNamed("pauseUpdate", 1, symbol("t_iCat"), 2, symbol("RemItem"), 3, symbol("t_sGrp"), 4, symbol("t_mp_iRef_rItem"));
  var t_iTyp = callNamed("pauseUpdate");
  var getText = callMethod("UpdateItemList", t_mp_sKey_sValue);
  if (lingoBinary("eq", t_mp_sKey_sValue, 1)) {
  var createDialogWindow = symbol("t_iCode");
  } else {
  if (lingoBinary("eq", t_mp_sKey_sValue, 3)) {
  createDialogWindow = symbol("t_sGroup");
  } else {
  if (lingoBinary("eq", t_mp_sKey_sValue, 5)) {
  createDialogWindow = symbol("CatSwitch");
  }

  }

  }

  var replaceChunks = callMethod("UpdateItemList", GetInventory.ClearItems);
  var t_s_Title = callMethod("UpdateItemList", t_mp_sKey_sValue);
  var stringp = 1;
  while (lingoBinary("lte", stringp, t_s_Title)) {
  var t_mp_sGroup_rDetails = callMethod("UpdateItemList", t_mp_sKey_sValue);
  var setText = callMethod("UpdateItemList", t_mp_sKey_sValue);
  var ShowSellConfirm = callMethod("UpdateItemList", t_mp_sKey_sValue);
  var t_sTxt = callMethod("t_kCat", t_mp_sKey_sValue);
  var t = callMethod("UpdateItemList", t_mp_sKey_sValue);
  if (lingoBinary("eq", t_mp_sKey_sValue, 1)) {
  var getInterface = symbol("t_iCat");
  var alert = callMethod("UpdateItemList", t_mp_sKey_sValue);
  if (lingoBinary("eq", alert, 0)) {
  var t_bFromHK = 0;
  }

  t_bFromHK = new LingoList([]);
  var t_sDstGrp = 1;
  while (lingoBinary("lte", t_sDstGrp, alert)) {
  t_sDstGrp = lingoBinary("add", t_sDstGrp, 1);
  }

  } else {
  if (lingoBinary("eq", t_mp_sKey_sValue, 2)) {
  getInterface = symbol("RemItem");
  t_bFromHK = 0;
  } else {
  if (lingoBinary("eq", t_mp_sKey_sValue, 3)) {
  getInterface = symbol("t_sGrp");
  t_bFromHK = 0;
  } else {
  if (lingoBinary("eq", t_mp_sKey_sValue, 4)) {
  getInterface = symbol("t_mp_iRef_rItem");
  t_bFromHK = callMethod("UpdateItemList", t_mp_sKey_sValue);
  var t_bShowAlert = callMethod("UpdateItemList", t_mp_sKey_sValue);
  var t_ar_ItemList = callMethod("UpdateItemList", t_mp_sKey_sValue);
  }

  }

  }

  }

  var t_iSrcRef = callMethod("t_sTrgGrp", t_iTyp, callMethod("t_sTrgGrp", t_iPrc, ShowSellConfirm));
  if (lingoBinary("eq", ShowSellConfirm, 4)) {
  }

  stringp = lingoBinary("add", stringp, 1);
  }

  if (replaceChunks) {
  callMethod("t_iDest", callMethod("t_sSrcGrp", callMethod("t_iTypeCode", t_status), getText))
  }

  stringp = 1;
  while (lingoBinary("lte", stringp, t_iTyp.md5_ii)) {
  var ShowSellRequest = callMethod("a_rMsg", t_iTyp, stringp);
  var t_iDstRef = callMethod("pObjectList", t_iTyp, stringp);
  callMethod("t_iSrc", callMethod("t_sSrcGrp", callMethod("t_iTypeCode", t_status), getText), ShowSellRequest, t_iDstRef)
  stringp = lingoBinary("add", stringp, 1);
  }

}

