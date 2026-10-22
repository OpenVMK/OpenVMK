// vmk_casual_checkers.cct / CCheckersPieceMovementAnimation / SetCurve

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetCurve(_me: LingoMe, _this: LingoValue, a_rCurve: LingoValue) {
  setMeProp(_me, "m_rCurve", a_rCurve);
}

