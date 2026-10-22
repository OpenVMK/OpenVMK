// minigame_engine.cct / OLDCTurnContainer / new

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _new(_me: LingoMe, a_ar_turnData: LingoValue, a_iNumber: LingoValue, a_iChecksum: LingoValue, a_bTested: LingoValue) {
  setMeProp(_me, "m_ar_subturns", new LingoList([]));
  setMeProp(_me, "m_iNumber", -float(1));
  setMeProp(_me, "m_bTested", 0);
  if ((lingoTruthy(callNamed("voidp", a_ar_turnData)) ? 0 : 1)) {
  for (var subturn of a_ar_turnData.toArray()) {
  callMethod("append", meProp(_me, "m_ar_subturns"), subturn)
  }

  }

  if ((lingoTruthy(callNamed("voidp", a_iNumber)) ? 0 : 1)) {
  setMeProp(_me, "m_iNumber", a_iNumber);
  }

  if ((lingoTruthy(callNamed("voidp", a_iChecksum)) ? 0 : 1)) {
  setMeProp(_me, "m_iChecksum", a_iChecksum);
  }

  if ((lingoTruthy(callNamed("voidp", a_bTested)) ? 0 : 1)) {
  setMeProp(_me, "m_bTested", a_bTested);
  }

  return _me;
}

