// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryComponent / _UpdateCreditBalance

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _UpdateCreditBalance(_me: LingoMe, _this: LingoValue, a_iCredits: LingoValue) {
  setMeProp(_me, "m_iCredits", new LingoPropList([symbol("credits"), new LingoPropList([0, a_iCredits])]));
  for (var tCallback of meProp(_me, "m_ar_mpCreditsCallbacks").toArray()) {
  callNamed("call", tCallback[symbol("method")], tCallback[symbol("object")], meProp(_me, "m_iCredits"), symbol("credits"))
  }

}

