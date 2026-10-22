// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CCannedTextManager / pickMatches

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function pickMatches(_me: LingoMe, a_sString: LingoValue, a_ar_words: LingoValue, o_ar_matches: LingoValue) {
  var c = 1;
  var t_iLength = a_sString.length;
  for (var tFreeWord of a_ar_words.toArray()) {
  if (lingoBinary("gt", tFreeWord.length, 0)) {
  var TestString = callNamed("convertToLowerCase", a_sString);
  var tCurrentOffset = 1;
  while (lingoBinary("lt", tCurrentOffset, t_iLength)) {
  if (lingoBinary("contains", TestString, tFreeWord)) {
  var tOffset = callNamed("offset", tFreeWord, TestString);
  if (lingoBinary("eq", tOffset, 0)) {
  callNamed("error", _me, "W00T!? String contained substring but it's offset is not valid?", symbol("pickMatches"))
  }

  var tNextIndex = lingoBinary("add", tOffset, tFreeWord.length);
  var tChar = TestString.char[tNextIndex];
  if (lingoBinary("or", callMethod("isSeparator", _me, tChar), lingoBinary("gt", tNextIndex, t_iLength))) {
  callMethod("append", o_ar_matches, new LingoPropList([symbol("offset"), lingoBinary("sub", lingoBinary("add", tCurrentOffset, tOffset), 1), symbol("string"), callNamed("chars", TestString, tOffset, lingoBinary("sub", lingoBinary("add", tOffset, tFreeWord.length), 1)), symbol("word"), c]))
  } else {
  }

  tCurrentOffset = lingoBinary("sub", lingoBinary("add", lingoBinary("add", tCurrentOffset, tOffset), tFreeWord.length), 1);
  TestString = callNamed("chars", TestString, tCurrentOffset, t_iLength);
  continue;
  }

  tCurrentOffset = t_iLength;
  }

  }

  c = lingoBinary("add", c, 1);
  }

}

