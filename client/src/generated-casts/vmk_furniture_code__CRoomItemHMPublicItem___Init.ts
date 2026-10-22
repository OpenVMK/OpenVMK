// vmk_furniture_code.cct / CRoomItemHMPublicItem / _Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _Init(_me: LingoMe, _this: LingoValue) {
  var t_rObj = callMethod("getObject", _this);
  if (callMethod("IsReady", callMethod("GetVisual", t_rObj))) {
  for (var t = 1; t <= _this.m_ar_sKey.count; ++t) {
  var t_sKey = _this.m_ar_sKey[t];
  var t_rBlk = callMethod("GetObjByKey", callMethod("GetContext", t_rObj), t_sKey);
  callMethod("SetParam", t_rBlk, "CLASS", "hmblock")
  }

  setMeProp(_me, "m_bReady", 1);
  }

}

