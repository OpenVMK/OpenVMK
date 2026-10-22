// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomContext / create

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function create(_me: LingoMe, _this: LingoValue, a_sKey: LingoValue, a_rXML: LingoValue) {
  var t_bBool = 0;
  if (callNamed("callAncestor", symbol("create"), _this, a_sKey, a_rXML)) {
  t_bBool = 1;
  var t_iRef = callNamed("integer", callMethod("GetParam", a_rXML, "REF"));
  if (callNamed("integerp", t_iRef)) {
  var t_sCls = callMethod("GetParam", a_rXML, "CLASS");
  var t_rMap = callMethod("getaProp", meProp(_me, "m_mp_sCls_mp_iRef_sKey"), t_sCls);
  if (callNamed("voidp", t_rMap)) {
  t_rMap = new LingoPropList([]);
  callMethod("addProp", meProp(_me, "m_mp_sCls_mp_iRef_sKey"), t_sCls, t_rMap)
  }

  callMethod("setaProp", t_rMap, t_iRef, a_sKey)
  }

  }

  return t_bBool;
}

