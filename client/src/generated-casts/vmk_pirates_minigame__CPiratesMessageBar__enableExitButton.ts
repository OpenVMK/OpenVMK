// vmk_pirates_minigame.cct / CPiratesMessageBar / enableExitButton

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function enableExitButton(_me: LingoMe, a_bVisible: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWndTitle"));
  if ((lingoTruthy(callNamed("voidp", tWndObj)) ? 0 : 1)) {
  if ((lingoTruthy(a_bVisible) ? 0 : 1)) {
  callMethod("hide", callMethod("getElement", tWndObj, "pirates.exitgame.button"))
  } else {
  callMethod("show", callMethod("getElement", tWndObj, "pirates.exitgame.button"))
  }

  }

}

