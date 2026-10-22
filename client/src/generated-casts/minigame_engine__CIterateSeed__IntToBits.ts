// minigame_engine.cct / CIterateSeed / IntToBits

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function IntToBits(_me: LingoMe, _this: LingoValue, a_iInput: LingoValue) {
  var tDigits = "01";
  while (lingoBinary("gt", a_iInput, 0)) {
  var tD = lingoBinary("mod", a_iInput, 2);
  a_iInput = lingoBinary("div", a_iInput, 2);
  var tHexstr = lingoBinary("join", tDigits.char[lingoBinary("add", tD, 1)], tHexstr);
  }

  while (1) {
  if (lingoBinary("eq", callNamed("length", tHexstr), 32)) {
  break;
  }

  tHexstr = tHexstr + "0";
  }

  return tHexstr;
}

