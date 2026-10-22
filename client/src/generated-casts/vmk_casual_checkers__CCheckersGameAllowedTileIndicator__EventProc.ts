// vmk_casual_checkers.cct / CCheckersGameAllowedTileIndicator / EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function EventProc(_me: LingoMe, _this: LingoValue, a_kEvent: LingoValue, a_sID: LingoValue) {
  if (lingoBinary("eq", a_kEvent, symbol("mouseUp"))) {
  callMethod("MovePiece", meProp(_me, "m_rGameEngine"), meProp(_me, "m_rPiece"), meProp(_me, "m_rTile"))
  return 1;
  }

}

