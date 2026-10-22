// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomContext / GetIterator

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetIterator(_me: LingoMe, _this: LingoValue, a_sCls: LingoValue) {
  var t_rMap = callMethod("getaProp", meProp(_me, "m_mp_sCls_mp_iRef_sKey"), a_sCls);
  if (callNamed("voidp", t_rMap)) {
  t_rMap = new LingoPropList([]);
  callMethod("setaProp", meProp(_me, "m_mp_sCls_mp_iRef_sKey"), a_sCls, t_rMap)
  }

  var t_rIterator = callNamed("createObject", symbol("temp"), "CRoomObjectIterator");
  callMethod("_FeedObjMap", t_rIterator, _this.m_rFactory, t_rMap)
  return t_rIterator;
}

