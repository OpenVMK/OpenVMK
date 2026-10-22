// item_2355.cct / CCheckersPieceMovementAnimation / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_rPiece", undefined);
  setMeProp(_me, "m_rCurve", undefined);
  setMeProp(_me, "m_rZTransfer", undefined);
  setMeProp(_me, "m_rGameEngine", undefined);
  return 1;
}

