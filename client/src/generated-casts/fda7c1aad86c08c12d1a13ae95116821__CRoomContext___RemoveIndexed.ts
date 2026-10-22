// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomContext / _RemoveIndexed

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _RemoveIndexed(_me: LingoMe, _this: LingoValue, a_iRef: LingoValue, a_sCls: LingoValue) {
  var t_bBool = 0;
  var t_rMap = callMethod("getaProp", meProp(_me, "m_mp_sCls_mp_iRef_sKey"), a_sCls);
  if ((lingoTruthy(callNamed("listp", t_rMap)) ? 0 : 1)) {
  return 0;
  }

  var t_sKey = callMethod("getaProp", t_rMap, a_iRef);
  if ((lingoTruthy(callNamed("stringp", t_sKey)) ? 0 : 1)) {
  return 0;
  }

  return callMethod("Remove", _this, t_sKey);
}

