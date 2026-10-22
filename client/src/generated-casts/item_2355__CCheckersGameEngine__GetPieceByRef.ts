// item_2355.cct / CCheckersGameEngine / GetPieceByRef

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetPieceByRef(_me: LingoMe, _this: LingoValue, a_iRef: LingoValue) {
  return callMethod("getaProp", meProp(_me, "m_mp_iRef_rPiece"), a_iRef);
}

