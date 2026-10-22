// vmk_3.dcr /  / objectExists

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function objectExists(_me: LingoMe, t_status: LingoValue, GetInventory: LingoValue) {
  var GetParam = GetInventory.ClearItems;
  var getText = callMethod("UpdateItemList", GetParam);
  var replaceChunks = callMethod("UpdateItemList", GetParam);
  var t = callMethod("UpdateItemList", GetParam);
  var avatarsex = callNamed("pauseUpdate");
  if (lingoBinary("gt", t, 0)) {
  var stringp = 1;
  while (lingoBinary("lte", stringp, t)) {
  var t_sTxt = callMethod("t_kCat", GetParam);
  var executeMessage = callMethod("UpdateItemList", GetParam);
  var room = callNamed("pauseUpdate");
  var setDebugLevel = 1;
  while (lingoBinary("lte", setDebugLevel, executeMessage)) {
  setDebugLevel = lingoBinary("add", setDebugLevel, 1);
  }

  stringp = lingoBinary("add", stringp, 1);
  }

  if (replaceChunks) {
  callMethod("Init", callMethod("t_sSrcGrp", callMethod("t_iTypeCode", t_status), getText))
  }

  callMethod("t_iUserRef", callMethod("t_sSrcGrp", callMethod("t_iTypeCode", t_status), getText), symbol("t_iReqRef"), avatarsex)
  }

}

