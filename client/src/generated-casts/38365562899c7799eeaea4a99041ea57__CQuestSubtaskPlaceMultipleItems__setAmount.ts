// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskPlaceMultipleItems / setAmount

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setAmount(_me: LingoMe, t_iCredits: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  var t_rElement = callMethod("getElement", meProp(_me, "m_rWindow"), "quest.items.needed");
  if (lingoBinary("neq", t_rElement, 0)) {
  callMethod("setText", t_rElement, t_iCredits)
  }

  }

  setMeProp(_me, "m_iCurrentScore", t_iCredits);
}

