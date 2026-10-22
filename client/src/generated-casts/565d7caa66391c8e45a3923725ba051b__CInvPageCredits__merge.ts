// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageCredits / merge

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function merge(_me: LingoMe, _this: LingoValue, a_rWindow: LingoValue) {
  setMeProp(_me, "m_rWindow", a_rWindow);
  callMethod("RegisterCreditUpdateCallback", callNamed("getThread", "inventory").component, symbol("update"), _this)
  return callMethod("merge", meProp(_me, "m_rWindow"), "vmk_inv_credits.window");
}

