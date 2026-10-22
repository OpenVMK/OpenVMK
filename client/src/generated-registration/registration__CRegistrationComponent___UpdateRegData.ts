// registration.cct / CRegistrationComponent / _UpdateRegData

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
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

