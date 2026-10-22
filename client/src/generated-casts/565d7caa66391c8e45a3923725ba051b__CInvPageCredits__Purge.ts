// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageCredits / Purge

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Purge(_me: LingoMe, _this: LingoValue, a_rWindow: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  setMeProp(_me, "m_rWindow", undefined);
  callMethod("UnregisterCreditUpdateCallback", callNamed("getThread", "inventory").component, symbol("update"), _this)
  return callMethod("unmerge", a_rWindow);
  } else {
  return 1;
  }

}

