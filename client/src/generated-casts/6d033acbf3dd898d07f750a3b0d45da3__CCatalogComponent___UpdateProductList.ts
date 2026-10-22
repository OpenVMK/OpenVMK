// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogComponent / _UpdateProductList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _UpdateProductList(_me: LingoMe, _this: LingoValue, a_mp_ProductList: LingoValue, a_sListType: LingoValue) {
  if (lingoBinary("eq", a_sListType, "index")) {
  setMeProp(_me, "m_mp_CatalogData", new LingoPropList([]));
  }

  var t_iPos = callMethod("findPos", meProp(_me, "m_mp_CatalogData"), a_sListType);
  if (callNamed("voidp", t_iPos)) {
  callMethod("addProp", meProp(_me, "m_mp_CatalogData"), a_sListType, a_mp_ProductList)
  } else {
  meProp(_me, "m_mp_CatalogData")[a_sListType] = a_mp_ProductList;
  }

  callMethod("_RefreshItemList", _this._interface, meProp(_me, "m_mp_CatalogData"), a_sListType)
}

