// core.old.cct / Special Services Class / secretDecode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function secretDecode(_me: LingoMe, tKey: LingoValue) {
  var tLength = tKey.length;
  if (lingoBinary("eq", lingoBinary("mod", tLength, 2), 1)) {
  tLength = lingoBinary("sub", tLength, 1);
  }

  var tTable = tKey.char.range(1, lingoBinary("div", tKey.length, 2));
  tKey = tKey.char.range(lingoBinary("add", 1, lingoBinary("div", tKey.length, 2)), tLength);
  var tCheckSum = 0;
  for (var i = 1; i <= tKey.length; ++i) {
  var c = tKey.char[i];
  var a = lingoBinary("sub", callNamed("offset", c, tTable), 1);
  if (lingoBinary("eq", lingoBinary("mod", a, 2), 0)) {
  a = lingoBinary("mul", a, 2);
  }

  if (lingoBinary("eq", lingoBinary("mod", lingoBinary("sub", i, 1), 3), 0)) {
  a = lingoBinary("mul", a, 3);
  }

  if (lingoBinary("lt", a, 0)) {
  a = lingoBinary("mod", tKey.length, 2);
  }

  tCheckSum = lingoBinary("add", tCheckSum, a);
  tCheckSum = callNamed("bitXor", tCheckSum, lingoBinary("mul", a, callNamed("power", 2, lingoBinary("mul", lingoBinary("mod", lingoBinary("sub", i, 1), 3), 8))));
  }

  return tCheckSum;
}

