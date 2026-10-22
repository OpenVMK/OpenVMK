// vmk_casual_checkers.cct / CCheckersGamePiece / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_bInitialized", 0);
  setMeProp(_me, "m_ar_iAllowedTiles", new LingoList([]));
  setMeProp(_me, "m_rGameEngine", undefined);
  setMeProp(_me, "m_bMoving", 0);
  setMeProp(_me, "m_ar_iTricks", new LingoList([]));
  setMeProp(_me, "m_rZTransfer", callNamed("createObject", callNamed("getUniqueID"), "CTransferFunction", "CRampClampTransferFunction"));
  setMeProp(_me, "m_rCurve", callNamed("createObject", symbol("temp"), "CRoomBezierCurve"));
  setMeProp(_me, "m_fMoveTime", float(0));
  setMeProp(_me, "m_sndObj", undefined);
  return 1;
}

