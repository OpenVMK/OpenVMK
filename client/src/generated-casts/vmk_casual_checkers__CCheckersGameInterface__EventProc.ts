// vmk_casual_checkers.cct / CCheckersGameInterface / EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function EventProc(_me: LingoMe, _this: LingoValue, a_kEvent: LingoValue, a_sElement: LingoValue, a_ptOffset: LingoValue, a_sWindow: LingoValue) {
  callNamed("put", a_sElement)
  switch (a_sElement) {
case lingoBinary("join", lingoBinary("join", "player", meProp(_me, "m_iOwnPlayer")), ".giveup"):
  callMethod("send", callNamed("getConnection", "VMK"), 950, new LingoPropList([symbol("integer"), meProp(_me, "m_rEngine").m_iGameID, symbol("integer"), 1, symbol("integer"), 0]))
  break;
case "quitturn":
  callMethod("send", callNamed("getConnection", "VMK"), 950, new LingoPropList([symbol("integer"), meProp(_me, "m_rEngine").m_iGameID, symbol("integer"), 3, symbol("integer"), 0]))
  break;
  }

  return 1;
}

