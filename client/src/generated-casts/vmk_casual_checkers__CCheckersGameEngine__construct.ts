// vmk_casual_checkers.cct / CCheckersGameEngine / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_rPlayers", new LingoPropList([]));
  setMeProp(_me, "m_mp_iRef_rPiece", new LingoPropList([]));
  setMeProp(_me, "m_ar_rTileIndicators", new LingoList([]));
  setMeProp(_me, "m_ar_rTileIndicatorPool", new LingoList([]));
  setMeProp(_me, "m_iCurrentTrick", -float(1));
  setMeProp(_me, "m_iOwnPlayer", 0);
  setMeProp(_me, "m_iWhosTurn", 0);
  return 1;
}

