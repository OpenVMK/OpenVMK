// vmk_casual_checkers.cct / CCheckersSpriteAnimPlayer / setPosition

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setPosition(_me: LingoMe, _this: LingoValue, a_ptCenter: LingoValue, a_iLocZ: LingoValue) {
  setMeProp(_me, "m_ptCenter", a_ptCenter);
  setMeProp(_me, "m_iLocZ", a_iLocZ);
  setMeProp(_me, "m_bPositionSet", 1);
}

