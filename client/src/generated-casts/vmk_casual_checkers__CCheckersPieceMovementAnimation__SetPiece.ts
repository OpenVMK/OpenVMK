// vmk_casual_checkers.cct / CCheckersPieceMovementAnimation / SetPiece

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetPiece(_me: LingoMe, _this: LingoValue, a_rPiece: LingoValue) {
  setMeProp(_me, "m_rPiece", a_rPiece);
}

