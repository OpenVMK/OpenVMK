// vmk_pirates_minigame.cct / CPiratesMessageBar / setEditable

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setEditable(_me: LingoMe, t_bState: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWndTitle"));
  if (lingoBinary("neq", tWndObj, 0)) {
  var tElem = callMethod("getElement", tWndObj, "pirates.chat.field");
  if (lingoBinary("neq", tElem, 0)) {
  callMethod("setEdit", tElem, t_bState)
  }

  }

}

