// vmk_pirates_game.cct / CPiratesMessageBar / setBlueScore

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setBlueScore(_me: LingoMe, a_iScore: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWndTitle"));
  if (callNamed("objectp", tWndObj)) {
  switch (meProp(_me, "m_iGameMode")) {
case 1:
  var t_rElem = callMethod("getElement", tWndObj, "gold.pirates");
  break;
case 2:
  t_rElem = callMethod("getElement", tWndObj, "gold.collected");
  break;
  default:
  t_rElem = callMethod("getElement", tWndObj, "gold.pirates");
  }

  if (callNamed("objectp", t_rElem)) {
  callMethod("setText", t_rElem, a_iScore)
  }

  }

}

