// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomContext / _IndexObjects

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _IndexObjects(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_mp_sCls_mp_iRef_sKey", new LingoPropList([]));
  var t_iCnt = callMethod("GetCount", _this);
  for (var i = 1; i <= t_iCnt; ++i) {
  callMethod("_RecursiveListing", _this, _this[i])
  }

  return 0;
}

