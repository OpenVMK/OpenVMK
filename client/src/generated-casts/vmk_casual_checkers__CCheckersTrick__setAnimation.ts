// vmk_casual_checkers.cct / CCheckersTrick / setAnimation

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setAnimation(_me: LingoMe, _this: LingoValue, a_rAnimation: LingoValue) {
  setMeProp(_me, "m_rAnimation", a_rAnimation);
}

