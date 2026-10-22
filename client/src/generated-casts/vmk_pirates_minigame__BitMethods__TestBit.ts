// vmk_pirates_minigame.cct / BitMethods / TestBit

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TestBit(_me: LingoMe, i_iValue: LingoValue, i_iBit: LingoValue) {
  if (lingoBinary("and", (lingoTruthy(callNamed("voidp", i_iValue)) ? 0 : 1), (lingoTruthy(callNamed("voidp", i_iBit)) ? 0 : 1))) {
  var tValue = i_iValue;
  var tMask = 1;
  for (var multi = 2; multi <= i_iBit; ++multi) {
  tMask = lingoBinary("mul", tMask, 2);
  }

  tValue = callNamed("bitAnd", tValue, tMask);
  return lingoBinary("gt", tValue, 0);
  }

}

