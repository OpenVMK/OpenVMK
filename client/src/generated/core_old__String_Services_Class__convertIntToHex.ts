// core.old.cct / String Services Class / convertIntToHex

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function convertIntToHex(_me: LingoMe, tInt: LingoValue) {
  if (lingoBinary("lte", tInt, 0)) {
  return "00";
  } else {
  while (lingoBinary("gt", tInt, 0)) {
  var tD = lingoBinary("mod", tInt, 16);
  tInt = lingoBinary("div", tInt, 16);
  var tHexstr = lingoBinary("join", meProp(_me, "pDigits").char[lingoBinary("add", tD, 1)], tHexstr);
  }

  }

  if (lingoBinary("eq", lingoBinary("mod", callNamed("length", tHexstr), 2), 1)) {
  tHexstr = lingoBinary("join", "0", tHexstr);
  }

  return tHexstr;
}

