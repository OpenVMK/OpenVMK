// vmk_shipwreck_handler.cct / CTextScroller / scramble

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function scramble(_me: LingoMe) {
  var t_allowedChars = "ACDMNQRTUWXYZ0123456789!";
  var t_iScrambleCount = 3;
  for (var i = 1; i <= t_iScrambleCount; ++i) {
  var t_randomIndex = callNamed("random", meProp(_me, "m_ViewQueue").count);
  meProp(_me, "m_ViewQueue")[t_randomIndex] = t_allowedChars.char[callNamed("random", t_allowedChars.char.count)];
  }

}

