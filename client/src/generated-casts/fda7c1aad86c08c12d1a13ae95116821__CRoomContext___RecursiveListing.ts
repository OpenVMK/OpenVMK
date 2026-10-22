// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomContext / _RecursiveListing

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _RecursiveListing(_me: LingoMe, _this: LingoValue, a_rObj: LingoValue) {
  var t_sKey = callMethod("GetKey", a_rObj);
  var t_iRef = callNamed("integer", callMethod("GetParam", a_rObj, "REF"));
  var t_sCls = callMethod("GetParam", a_rObj, "CLASS");
  if (lingoBinary("or", lingoBinary("or", lingoBinary("or", lingoBinary("eq", t_sCls, "exit"), lingoBinary("eq", t_sCls, "teleport")), lingoBinary("eq", t_sCls, "queue")), lingoBinary("eq", t_sCls, "sit"))) {
  t_sCls = "tile";
  }

  if (callNamed("listp", callMethod("getaProp", meProp(_me, "m_mp_sCls_mp_iRef_sKey"), t_sCls))) {
  if (callNamed("objectp", callMethod("getaProp", callMethod("getaProp", meProp(_me, "m_mp_sCls_mp_iRef_sKey"), t_sCls), t_sKey))) {
  return callNamed("error", _this, lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "Object already listed:", "\""), t_sKey), "\""), "!"), symbol("_RecursiveListing"));
  }

  } else {
  callMethod("setaProp", meProp(_me, "m_mp_sCls_mp_iRef_sKey"), t_sCls, new LingoPropList([]))
  }

  callMethod("setaProp", callMethod("getaProp", meProp(_me, "m_mp_sCls_mp_iRef_sKey"), t_sCls), t_iRef, t_sKey)
  var t_iCount = callMethod("GetCount", a_rObj);
  for (var i = 1; i <= t_iCount; ++i) {
  if ((lingoTruthy(callMethod("_RecursiveListing", _this, a_rObj[i])) ? 0 : 1)) {
  return 0;
  }

  }

  return 1;
}

