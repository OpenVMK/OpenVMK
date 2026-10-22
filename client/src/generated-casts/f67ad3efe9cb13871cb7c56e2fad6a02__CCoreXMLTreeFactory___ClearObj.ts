// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLTreeFactory / _ClearObj

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ClearObj(_me: LingoMe, _this: LingoValue, a_rObj: LingoValue) {
  var t_sKey = callMethod("GetKey", a_rObj);
  var t_rObj = a_rObj;
  while (1) {
  var t_rTmp = callMethod("getaProp", t_rObj, symbol("ancestor"));
  callMethod("setaProp", t_rObj, symbol("ancestor"), undefined)
  var t_bFlg = callMethod("handler", t_rObj, symbol("deconstruct"));
  callMethod("setaProp", t_rObj, symbol("ancestor"), t_rTmp)
  if (t_bFlg) {
  callMethod("deconstruct", t_rObj)
  }

  t_rObj = callMethod("getaProp", t_rObj, symbol("ancestor"));
  if (callNamed("voidp", t_rObj)) {
  break;
  }

  }

  callMethod("deleteProp", meProp(_me, "m_mp_sKey_rObj"), t_sKey)
}

