// vmk_casual_checkers.cct / CCheckersGameInterface / SetGameMode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetGameMode(_me: LingoMe, _this: LingoValue, a_kMode: LingoValue) {
  if (lingoBinary("eq", meProp(_me, "m_kGameMode"), symbol("none"))) {
  setMeProp(_me, "m_kGameMode", a_kMode);
  if (lingoBinary("eq", a_kMode, symbol("play"))) {
  callMethod("ShowInterface", _this)
  }

  } else {
  callNamed("error", _this, "Game mode already assigned!", symbol("SetGameMode"))
  }

}

