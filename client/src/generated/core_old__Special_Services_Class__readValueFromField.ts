// core.old.cct / Special Services Class / readValueFromField

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function readValueFromField(_me: LingoMe, tField: LingoValue, tDelimiter: LingoValue, tSearchedKey: LingoValue) {
  var tStr = callNamed("field", tField);
  var tDelim = theProperty("itemDelimiter");
  if (callNamed("voidp", tDelimiter)) {
  tDelimiter = "\r";
  }

  setTheProperty("itemDelimiter", tDelimiter);
  for (var i = 1; i <= tStr.item.count; ++i) {
  var tPair = tStr.item[i];
  if (lingoBinary("and", lingoBinary("neq", tPair.word[1].char[1], "#"), lingoBinary("neq", tPair, ""))) {
  setTheProperty("itemDelimiter", "=");
  var tProp = tPair.item[1].word.range(1, tPair.item[1].word.count);
  var tvalue = tPair.item.range(2, tPair.item.count);
  tvalue = tvalue.word.range(1, tvalue.word.count);
  if (lingoBinary("eq", tProp, tSearchedKey)) {
  if (lingoBinary("and", !lingoTruthy(lingoBinary("contains", tvalue, callNamed("space"))), callNamed("integerp", callNamed("integer", tvalue)))) {
  if (lingoBinary("eq", callNamed("length", callNamed("string", callNamed("integer", tvalue))), callNamed("length", tvalue))) {
  tvalue = callNamed("integer", tvalue);
  }

  } else {
  if (callNamed("floatp", callNamed("float", tvalue))) {
  tvalue = callNamed("float", tvalue);
  }

  }

  if (callNamed("stringp", tvalue)) {
  for (var j = 1; j <= callNamed("length", tvalue); ++j) {
  switch (callNamed("charToNum", tvalue.char[j])) {
case 228:
  /* chunk assignment not ported */;
  break;
case 246:
  /* chunk assignment not ported */;
  break;
  }

  }

  }

  setTheProperty("itemDelimiter", tDelim);
  return tvalue;
  }

  }

  setTheProperty("itemDelimiter", tDelimiter);
  }

  setTheProperty("itemDelimiter", tDelim);
  return 0;
}

