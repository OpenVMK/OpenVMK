// 2230483a2e5366aa24e52c1b02d9674c.cct / Base64 / Base64Decode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Base64Decode(_me: LingoMe, str: LingoValue) {
  var Base64Lookup = new LingoPropList(["A", 0, "B", 1, "C", 2, "D", 3, "E", 4, "F", 5, "G", 6, "H", 7, "I", 8, "J", 9, "K", 10, "L", 11, "M", 12, "N", 13, "O", 14, "P", 15, "Q", 16, "R", 17, "S", 18, "T", 19, "U", 20, "V", 21, "W", 22, "X", 23, "Y", 24, "Z", 25, "a", 26, "b", 27, "c", 28, "d", 29, "e", 30, "f", 31, "g", 32, "h", 33, "i", 34, "j", 35, "k", 36, "l", 37, "m", 38, "n", 39, "o", 40, "p", 41, "q", 42, "r", 43, "s", 44, "t", 45, "u", 46, "v", 47, "w", 48, "x", 49, "y", 50, "z", 51, "0", 52, "1", 53, "2", 54, "3", 55, "4", 56, "5", 57, "6", 58, "7", 59, "8", 60, "9", 61, "+", 62, "/", 63]);
  var subStrings = new LingoList([]);
  var out = "";
  var quanta = new LingoList([]);
  for (var i = 1; i <= str.length; ++i) {
  var c = callMethod("getaProp", Base64Lookup, str.char[i]);
  if ((lingoTruthy(callNamed("voidp", c)) ? 0 : 1)) {
  callMethod("add", quanta, c)
  }

  if (lingoBinary("eq", quanta.count, 4)) {
  out = out + callNamed("numToChar", lingoBinary("div", callNamed("bitAnd", lingoBinary("add", lingoBinary("mul", quanta[1], 64), quanta[2]), 4080), 16));
  out = out + callNamed("numToChar", lingoBinary("div", callNamed("bitAnd", lingoBinary("add", lingoBinary("mul", quanta[2], 64), quanta[3]), 1020), 4));
  out = out + callNamed("numToChar", callNamed("bitAnd", lingoBinary("add", lingoBinary("mul", quanta[3], 64), quanta[4]), 255));
  quanta = new LingoList([]);
  if (lingoBinary("gt", callNamed("length", out), meProp(_me, "pSubLengthLim"))) {
  callMethod("append", subStrings, out)
  out = "";
  }

  }

  }

  if (lingoBinary("eq", quanta.count, 3)) {
  out = out + callNamed("numToChar", lingoBinary("div", callNamed("bitAnd", lingoBinary("add", lingoBinary("mul", quanta[1], 64), quanta[2]), 4080), 16));
  out = out + callNamed("numToChar", lingoBinary("div", callNamed("bitAnd", lingoBinary("add", lingoBinary("mul", quanta[2], 64), quanta[3]), 1020), 4));
  } else {
  if (lingoBinary("eq", quanta.count, 2)) {
  out = out + callNamed("numToChar", lingoBinary("div", callNamed("bitAnd", lingoBinary("add", lingoBinary("mul", quanta[1], 64), quanta[2]), 4080), 16));
  }

  }

  str = "";
  for (var s of subStrings.toArray()) {
  str = str + s;
  }

  str = str + out;
  return str;
}

