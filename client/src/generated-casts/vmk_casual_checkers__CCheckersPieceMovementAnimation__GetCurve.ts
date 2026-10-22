// vmk_casual_checkers.cct / CCheckersPieceMovementAnimation / GetCurve

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetCurve(_me: LingoMe, _this: LingoValue) {
  return meProp(_me, "m_rCurve");
}

