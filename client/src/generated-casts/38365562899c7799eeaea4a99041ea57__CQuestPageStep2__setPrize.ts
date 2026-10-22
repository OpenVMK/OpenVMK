// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep2 / setPrize

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setPrize(_me: LingoMe, t_iCredits: LingoValue) {
  var t_rElement = callMethod("getElement", meProp(_me, "m_rWindow"), "quest.credits.prize");
  if (lingoBinary("neq", t_rElement, 0)) {
  callMethod("setText", t_rElement, t_iCredits)
  }

  setMeProp(_me, "m_iCurrentPrize", t_iCredits);
}

