// vmk_pirates_game.cct / CPiratesMessageBar / SetTimerDisplay

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetTimerDisplay(_me: LingoMe, a_iSeconds: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWndTitle"));
  if (callNamed("objectp", tWndObj)) {
  var t_rElem = callMethod("getElement", tWndObj, "gametime");
  if (callNamed("objectp", t_rElem)) {
  var tMinutes = lingoBinary("div", a_iSeconds, 60);
  var tSeconds = lingoBinary("sub", a_iSeconds, lingoBinary("mul", 60, tMinutes));
  var tText = "";
  if (lingoBinary("lt", tMinutes, 10)) {
  tText = lingoBinary("join", "0", tMinutes);
  } else {
  tText = callNamed("string", tMinutes);
  }

  tText = lingoBinary("join", tText, ":");
  if (lingoBinary("lt", tSeconds, 10)) {
  tText = lingoBinary("join", lingoBinary("join", tText, "0"), tSeconds);
  } else {
  tText = lingoBinary("join", tText, callNamed("string", tSeconds));
  }

  callMethod("setText", t_rElem, tText)
  }

  }

}

