// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogHandler / CatalogIndex

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CatalogIndex(_me: LingoMe, a_rMsg: LingoValue) {
  var t_iSuperCatCount = callMethod("GetIntFrom", a_rMsg.connection);
  var t_mpCatIndex = new LingoPropList([]);
  for (var i = 1; i <= t_iSuperCatCount; ++i) {
  var t_iName = callMethod("GetIntFrom", a_rMsg.connection);
  var t_sName = callNamed("getText", lingoBinary("join", "cat.name.", t_iName));
  var t_iCatCount = callMethod("GetIntFrom", a_rMsg.connection);
  t_mpCatIndex[t_sName] = new LingoPropList([]);
  var t_mpCurCat = t_mpCatIndex[t_sName];
  callMethod("addProp", t_mpCurCat, symbol("state"), 0)
  callMethod("addProp", t_mpCurCat, symbol("id"), t_iName)
  callMethod("addProp", t_mpCurCat, symbol("name"), t_sName)
  if (lingoBinary("gt", t_iCatCount, 0)) {
  for (var e = 1; e <= t_iCatCount; ++e) {
  var t_iID = callMethod("GetIntFrom", a_rMsg.connection);
  var t_sTitle = callMethod("GetStrFrom", a_rMsg.connection);
  var t_bSpecial = callMethod("GetIntFrom", a_rMsg.connection);
  callMethod("addProp", t_mpCurCat, t_sTitle, new LingoPropList([]))
  var t_mpCurSubCat = t_mpCurCat[t_sTitle];
  callMethod("addProp", t_mpCurSubCat, symbol("id"), t_iID)
  callMethod("addProp", t_mpCurSubCat, symbol("state"), 0)
  callMethod("addProp", t_mpCurSubCat, symbol("special"), t_bSpecial)
  }

  }

  }

  callMethod("_UpdateProductList", callMethod("getComponent", _me), t_mpCatIndex, "index")
}

