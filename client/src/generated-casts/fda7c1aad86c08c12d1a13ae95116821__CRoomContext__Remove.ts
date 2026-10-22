// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomContext / Remove

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Remove(_me: LingoMe, _this: LingoValue, a_sKey: LingoValue) {
  var t_bBool = 0;
  var t_rObj = callMethod("GetObjByKey", _this.m_rFactory, a_sKey);
  if (callNamed("objectp", t_rObj)) {
  var t_sCls = callMethod("GetParam", t_rObj, "CLASS");
  var t_iRef = callNamed("integer", callMethod("GetParam", t_rObj, "REF"));
  if (callNamed("objectp", callMethod("GetChild", _this, a_sKey))) {
  if (callNamed("callAncestor", symbol("Remove"), _this, a_sKey)) {
  var t_rMap = callMethod("getaProp", meProp(_me, "m_mp_sCls_mp_iRef_sKey"), t_sCls);
  if (callNamed("listp", t_rMap)) {
  callMethod("deleteProp", t_rMap, t_iRef)
  }

  t_bBool = 1;
  }

  } else {
  t_bBool = callMethod("Remove", callMethod("GetOwner", t_rObj), a_sKey);
  if (t_bBool) {
  t_rMap = callMethod("getaProp", meProp(_me, "m_mp_sCls_mp_iRef_sKey"), t_sCls);
  if (callNamed("listp", t_rMap)) {
  callMethod("deleteProp", t_rMap, t_iRef)
  }

  }

  }

  }

  return t_bBool;
}

