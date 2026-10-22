// vmk_casual_checkers.cct / CCheckersGameEngine / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rInterface"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rInterface")))
  setMeProp(_me, "m_rInterface", undefined);
  }

  for (var t_rObj of meProp(_me, "m_ar_rTileIndicators").toArray()) {
  callNamed("removeObject", callMethod("getID", t_rObj))
  }

  for (var t_rObj of meProp(_me, "m_ar_rTileIndicatorPool").toArray()) {
  callNamed("removeObject", callMethod("getID", t_rObj))
  }

  setMeProp(_me, "m_ar_rTileIndicators", undefined);
  setMeProp(_me, "m_ar_rTileIndicatorPool", undefined);
  setMeProp(_me, "m_mp_iRef_rPiece", undefined);
  setMeProp(_me, "m_rTileSetBoard", undefined);
  setMeProp(_me, "m_rRoomContext", undefined);
  return 1;
}

