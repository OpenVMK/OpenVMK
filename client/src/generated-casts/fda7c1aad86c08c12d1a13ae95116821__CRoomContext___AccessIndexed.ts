// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomContext / _AccessIndexed

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _AccessIndexed(_me: LingoMe, _this: LingoValue, a_iRef: LingoValue, a_sCls: LingoValue) {
  var t_rMap = callMethod("getaProp", meProp(_me, "m_mp_sCls_mp_iRef_sKey"), a_sCls);
  if (callNamed("voidp", t_rMap)) {
  return undefined;
  } else {
  return callMethod("GetObjByKey", _this.m_rFactory, callMethod("getaProp", t_rMap, a_iRef));
  }

}

