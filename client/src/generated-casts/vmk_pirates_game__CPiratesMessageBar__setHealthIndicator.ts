// vmk_pirates_game.cct / CPiratesMessageBar / setHealthIndicator

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setHealthIndicator(_me: LingoMe, a_iHealth: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWndTitle"));
  if (callNamed("objectp", tWndObj)) {
  for (var i = 1; i <= 5; ++i) {
  var t_rElem = callMethod("getElement", tWndObj, lingoBinary("join", "health", i));
  callMethod("hide", t_rElem)
  if (lingoBinary("gte", a_iHealth, i)) {
  callMethod("show", t_rElem)
  }

  }

  }

}

