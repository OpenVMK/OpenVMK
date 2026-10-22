// vmk_pirates_minigame.cct / CPiratesMessageBar / setRedScore

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setRedScore(_me: LingoMe, a_iScore: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWndTitle"));
  if ((lingoTruthy(callNamed("voidp", tWndObj)) ? 0 : 1)) {
  callMethod("setText", callMethod("getElement", tWndObj, "score.red"), a_iScore)
  }

}

