// vmk_pirates2_minigame.cct / CPiratesMessageBar / SetTeam2Wins

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetTeam2Wins(_me: LingoMe, a_iWins: LingoValue, a_iTeam1: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWndTitle"));
  if (callNamed("objectp", tWndObj)) {
  var t_rElem = callMethod("getElement", tWndObj, "stagescores");
  if (callNamed("objectp", t_rElem)) {
  callMethod("setText", t_rElem, lingoBinary("joinPad", lingoBinary("joinPad", a_iTeam1, "-"), a_iWins))
  }

  }

}

