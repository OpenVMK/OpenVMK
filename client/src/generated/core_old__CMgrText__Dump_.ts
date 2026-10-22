// core.old.cct / CMgrText / Dump_

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Dump_(_me: LingoMe, tField: LingoValue, tDelimiter: LingoValue) {
  var t = theProperty("milliSeconds");
  if (!lingoTruthy(callNamed("memberExists", tField))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Field member expected:", tField), symbol("dump"));
  }

  var tStr = callNamed("field", tField);
  var tStrServices = callNamed("getStringServices");
  var tSpecialChunks = new LingoPropList(["\\r", "\r", "\\t", "\t", "\\s", callNamed("space"), "<BR>", "\r"]);
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
  tvalue = callMethod("convertSpecialChars", tStrServices, tvalue);
  for (var k = 1; k <= tSpecialChunks.count; ++k) {
  var tMark = callMethod("getPropAt", tSpecialChunks, k);
  if (lingoBinary("contains", tvalue, tMark)) {
  tvalue = callMethod("replaceChunks", tStrServices, tvalue, tMark, tSpecialChunks[k]);
  }

  }

  var tPropLowerCase = callNamed("convertToLowerCase", tProp);
  _me.pItemList[tPropLowerCase] = tvalue;
  }

  setTheProperty("itemDelimiter", tDelimiter);
  }

  setTheProperty("itemDelimiter", tDelim);
  t = lingoBinary("sub", theProperty("milliSeconds"), t);
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "text parsed in", t), "ms"))
  return 1;
}

