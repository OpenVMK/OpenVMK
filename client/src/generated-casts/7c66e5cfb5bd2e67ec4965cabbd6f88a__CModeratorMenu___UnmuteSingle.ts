// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorMenu / _UnmuteSingle

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _UnmuteSingle(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("neq", meProp(_me, "m_sName"), "")) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "UnmuteUser", new LingoPropList([symbol("string"), meProp(_me, "m_sName")]))
  }

}

