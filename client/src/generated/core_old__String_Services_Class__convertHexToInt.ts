// core.old.cct / String Services Class / convertHexToInt

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function convertHexToInt(_me: LingoMe, tHex: LingoValue) {
  var tBase = 1;
  var tvalue = 0;
  while (lingoBinary("gt", callNamed("length", tHex), 0)) {
  var tLc = lastChunk(tHex, "char");
  tHex = deleteStringChunk(tHex, "char", -30000, 0);
  var tVl = lingoBinary("sub", callNamed("offset", tLc, meProp(_me, "pDigits")), 1);
  tvalue = lingoBinary("add", tvalue, lingoBinary("mul", tBase, tVl));
  tBase = lingoBinary("mul", tBase, 16);
  }

  return tvalue;
}

