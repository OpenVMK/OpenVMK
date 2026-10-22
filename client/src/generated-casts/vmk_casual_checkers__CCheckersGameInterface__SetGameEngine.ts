// vmk_casual_checkers.cct / CCheckersGameInterface / SetGameEngine

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetGameEngine(_me: LingoMe, _this: LingoValue, a_rEngine: LingoValue) {
  setMeProp(_me, "m_rEngine", a_rEngine);
  callMethod("SetGameEngine", callNamed("getObject", meProp(_me, "m_sIndicator")), a_rEngine)
}

