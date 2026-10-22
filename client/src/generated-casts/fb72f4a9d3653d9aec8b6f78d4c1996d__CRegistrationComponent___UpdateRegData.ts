// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegistrationComponent / _UpdateRegData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _UpdateRegData(_me: LingoMe, _this: LingoValue, a_mp_ProductList: LingoValue, a_sListType: LingoValue) {
  var t_iPos = callMethod("findPos", meProp(_me, "m_mp_RegData"), a_sListType);
  if (callNamed("voidp", t_iPos)) {
  callMethod("addProp", meProp(_me, "m_mp_RegData"), a_sListType, a_mp_ProductList)
  } else {
  meProp(_me, "m_mp_RegData")[a_sListType] = a_mp_ProductList;
  }

  callMethod("_RefreshRegList", _this._interface, meProp(_me, "m_mp_RegData"), a_sListType)
}

