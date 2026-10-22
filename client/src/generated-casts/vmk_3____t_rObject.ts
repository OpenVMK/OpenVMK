// vmk_3.dcr /  / t_rObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function t_rObject(_me: LingoMe, t_status: LingoValue, GetInventory: LingoValue) {
  var bitAnd = callNamed("pauseUpdate", symbol("unregisterListener"), callMethod("UpdateItemList", GetInventory.ClearItems));
  var t = callMethod("UpdateItemList", GetInventory.ClearItems);
  var registerListener = callNamed("pauseUpdate");
  var stringp = 1;
  while (lingoBinary("lte", stringp, t)) {
  var t_mp_sGroup_rDetails = callMethod("UpdateItemList", GetInventory.ClearItems);
  var t_mp_iRef_rItem_Own = callMethod("UpdateItemList", GetInventory.ClearItems);
  var dialogOK = callMethod("UpdateItemList", GetInventory.ClearItems);
  if (lingoBinary("eq", bitAnd, 1)) {
  var alert = callMethod("UpdateItemList", GetInventory.ClearItems);
  if (lingoBinary("eq", alert, 0)) {
  var t_bFromHK = 0;
  }

  t_bFromHK = new LingoList([]);
  var t_sDstGrp = 1;
  while (lingoBinary("lte", t_sDstGrp, alert)) {
  t_sDstGrp = lingoBinary("add", t_sDstGrp, 1);
  }

  } else {
  if (lingoBinary("eq", bitAnd, 4)) {
  var t_sID = callMethod("UpdateItemList", GetInventory.ClearItems);
  }

  }

  stringp = lingoBinary("add", stringp, 1);
  }

  var t_rList = callNamed("pauseUpdate", symbol("unregisterListener"), callMethod("UpdateItemList", GetInventory.ClearItems));
  t = callMethod("UpdateItemList", GetInventory.ClearItems);
  var m_bLevelReqMsgEnabled = callNamed("pauseUpdate");
  stringp = 1;
  while (lingoBinary("lte", stringp, t)) {
  t_mp_sGroup_rDetails = callMethod("UpdateItemList", GetInventory.ClearItems);
  t_mp_iRef_rItem_Own = callMethod("UpdateItemList", GetInventory.ClearItems);
  dialogOK = callMethod("UpdateItemList", GetInventory.ClearItems);
  if (lingoBinary("eq", bitAnd, 1)) {
  alert = callMethod("UpdateItemList", GetInventory.ClearItems);
  if (lingoBinary("eq", alert, 0)) {
  t_bFromHK = 0;
  }

  t_bFromHK = new LingoList([]);
  t_sDstGrp = 1;
  while (lingoBinary("lte", t_sDstGrp, alert)) {
  t_sDstGrp = lingoBinary("add", t_sDstGrp, 1);
  }

  } else {
  if (lingoBinary("eq", bitAnd, 4)) {
  t_sID = callMethod("UpdateItemList", GetInventory.ClearItems);
  }

  }

  stringp = lingoBinary("add", stringp, 1);
  }

}

