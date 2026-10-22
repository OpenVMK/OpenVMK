// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCtlgPageBase / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  if (meProp(_me, "m_bReady")) {
  for (var t_rPageObj of meProp(_me, "m_mp_rPageObjects").toArray()) {
  callNamed("removeObject", callMethod("getID", t_rPageObj))
  }

  setMeProp(_me, "m_mp_rPageObjects", new LingoPropList([]));
  setMeProp(_me, "m_rCurPageObj", undefined);
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  callNamed("removeWindow", callMethod("getID", meProp(_me, "m_rWindow")))
  setMeProp(_me, "m_rWindow", undefined);
  }

  }

  setMeProp(_me, "m_bReady", 0);
  setMeProp(_me, "m_bVisible", 0);
  return 1;
}

