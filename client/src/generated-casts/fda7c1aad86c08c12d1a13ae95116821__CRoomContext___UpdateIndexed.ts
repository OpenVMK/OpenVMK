// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomContext / _UpdateIndexed

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _UpdateIndexed(_me: LingoMe, _this: LingoValue, a_mp_sCls_mp_iRef_sKey: LingoValue) {
  for (var t_mp_iRef_sKey of meProp(_me, "m_mp_sCls_mp_iRef_sKey").toArray()) {
  var t_iCount = t_mp_iRef_sKey.count;
  for (var i = 1; i <= t_iCount; ++i) {
  callMethod("deleteAt", t_mp_iRef_sKey, 1)
  }

  }

  for (var i = 1; i <= a_mp_sCls_mp_iRef_sKey.count; ++i) {
  var t_sCls = callMethod("getPropAt", a_mp_sCls_mp_iRef_sKey, i);
  var t_rOut = a_mp_sCls_mp_iRef_sKey[i];
  if (callNamed("voidp", callMethod("getaProp", meProp(_me, "m_mp_sCls_mp_iRef_sKey"), t_sCls))) {
  var t_rIn = new LingoPropList([]);
  callMethod("setaProp", meProp(_me, "m_mp_sCls_mp_iRef_sKey"), t_sCls, t_rIn)
  } else {
  t_rIn = callMethod("getaProp", meProp(_me, "m_mp_sCls_mp_iRef_sKey"), t_sCls);
  }

  t_iCount = t_rOut.count;
  for (var j = 1; j <= t_iCount; ++j) {
  callMethod("addProp", t_rIn, callMethod("getPropAt", t_rOut, j), t_rOut[j])
  }

  }

}

