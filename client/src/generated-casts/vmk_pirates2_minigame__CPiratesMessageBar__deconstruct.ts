// vmk_pirates2_minigame.cct / CPiratesMessageBar / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callMethod("hideMessageBar", _me)
  var m_cCurrWord = "";
  setMeProp(_me, "m_bValidFlag", 0);
  var m_ar_cWords = new LingoList([]);
  return callMethod("regMsgList", _me, 0);
}

