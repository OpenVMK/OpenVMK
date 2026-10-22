// vmk_casual_checkers.cct / CCheckersGameHighScoreInterface / SetImageElement

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetImageElement(_me: LingoMe, _this: LingoValue, a_rElement: LingoValue) {
  setMeProp(_me, "m_rElement", a_rElement);
}

