// vmk_highscore.cct / CHighscoreComponent / SetElement

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetElement(_me: LingoMe, a_rElement: LingoValue) {
  setMeProp(_me, "m_rElement", a_rElement);
  if (lingoBinary("neq", meProp(_me, "m_rElement"), 0)) {
  setMeProp(_me, "m_rItemList", callNamed("createObject", symbol("random"), "CHighscoreItemList"));
  if (lingoBinary("eq", meProp(_me, "m_rItemList"), 0)) {
  return callNamed("error", _me, "Failed to create Highscore Item List", symbol("SetElement"));
  }

  callMethod("SetWidth", meProp(_me, "m_rItemList"), callMethod("getProperty", meProp(_me, "m_rElement"), symbol("width")))
  }

}

