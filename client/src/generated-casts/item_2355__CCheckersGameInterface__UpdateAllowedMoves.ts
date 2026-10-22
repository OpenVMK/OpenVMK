// item_2355.cct / CCheckersGameInterface / UpdateAllowedMoves

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateAllowedMoves(_me: LingoMe, _this: LingoValue, a_mp_iPiece_ar_iTiles: LingoValue, a_bClearPrevious: LingoValue, a_bContinuedTurn: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "quitturn"), symbol("visible"), a_bContinuedTurn)
  }

}

