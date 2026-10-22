// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogHandler / GetCatalogCategory

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetCatalogCategory(_me: LingoMe, a_rMsg: LingoValue) {
  var t_iID = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iName = callMethod("GetStrFrom", a_rMsg.connection);
  var t_iLayOut = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iProdCount = callMethod("GetIntFrom", a_rMsg.connection);
  var t_mpProdList = new LingoPropList([]);
  callMethod("addProp", t_mpProdList, callNamed("string", t_iID), new LingoList([]))
  if (lingoBinary("gt", t_iProdCount, 0)) {
  for (var i = 1; i <= t_iProdCount; ++i) {
  var t_mp_data = new LingoPropList([]);
  callMethod("addProp", t_mp_data, symbol("code"), callMethod("GetIntFrom", a_rMsg.connection))
  callMethod("addProp", t_mp_data, symbol("price"), callMethod("GetIntFrom", a_rMsg.connection))
  var tKeyPairCount = callMethod("GetIntFrom", a_rMsg.connection);
  var t_ar_keypairs = new LingoPropList([]);
  for (var j = 1; j <= tKeyPairCount; ++j) {
  var t_sKey = callMethod("GetStrFrom", a_rMsg.connection);
  var t_sValue = callMethod("GetStrFrom", a_rMsg.connection);
  t_ar_keypairs[t_sKey] = t_sValue;
  }

  if (lingoBinary("gt", tKeyPairCount, 0)) {
  callMethod("addProp", t_mp_data, symbol("param"), t_ar_keypairs)
  }

  callMethod("addProp", t_mp_data, symbol("categoryId"), t_iID)
  callMethod("add", t_mpProdList[callNamed("string", t_iID)], t_mp_data)
  }

  } else {
  }

  if (lingoBinary("eq", t_iLayOut, 3)) {
  callMethod("_SaveRoomList", _me._interface, t_mpProdList)
  } else {
  callMethod("_UpdateProductList", callMethod("getComponent", _me), t_mpProdList, "category")
  }

}

