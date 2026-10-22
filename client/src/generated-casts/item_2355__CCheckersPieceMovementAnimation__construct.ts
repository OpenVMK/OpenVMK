// item_2355.cct / CCheckersPieceMovementAnimation / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_bMoving", 0);
  setMeProp(_me, "m_rZTransfer", callNamed("createObject", symbol("temp"), "CTransferFunction", "CRampClampTransferFunction"));
  setMeProp(_me, "m_rCurve", callNamed("createObject", symbol("temp"), "CRoomBezierCurve"));
  setMeProp(_me, "m_fMoveTime", float(0));
  return 1;
}

