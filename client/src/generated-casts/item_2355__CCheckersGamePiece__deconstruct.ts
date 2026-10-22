// item_2355.cct / CCheckersGamePiece / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rGameEngine"))) {
  callMethod("PieceRemoved", meProp(_me, "m_rGameEngine"), _this)
  }

  setMeProp(_me, "m_rCurve", undefined);
  setMeProp(_me, "m_rZTransfer", undefined);
  setMeProp(_me, "m_ar_iAllowedTiles", undefined);
  setMeProp(_me, "m_rGameEngine", undefined);
  setMeProp(_me, "m_bInitialized", 0);
  if (callNamed("objectp", meProp(_me, "m_sndObj"))) {
  callMethod("StopSound", meProp(_me, "m_sndObj"))
  }

  callNamed("callAncestor", symbol("deconstruct"), _this)
  return 1;
}

