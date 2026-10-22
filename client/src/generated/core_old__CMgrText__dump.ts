// core.old.cct / CMgrText / dump

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dump(_me: LingoMe, tField: LingoValue, tDelimiter: LingoValue) {
  if (!lingoTruthy(callNamed("memberExists", tField))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Field member expected:", tField), symbol("dump"));
  }

  var t_sRawStr = callNamed("field", tField);
  var tStrServices = callNamed("getStringServices");
  var tSpecialChunks = new LingoPropList(["\\r", "\r", "\\t", "\t", "\\s", callNamed("space"), "<BR>", "\r"]);
  var t_ar_sLineChunks = new LingoList([]);
  var t_iMaxLinesPerChunk = 100;
  var t_iTotalChunkCount = lingoBinary("add", lingoBinary("div", t_sRawStr.line.count, t_iMaxLinesPerChunk), 1);
  for (var t_iChunk = 1; t_iChunk <= t_iTotalChunkCount; ++t_iChunk) {
  var t_iStartChunkIndex = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", t_iChunk, 1), t_iMaxLinesPerChunk), 1);
  var t_iEndChunkIndex = lingoBinary("sub", lingoBinary("add", t_iStartChunkIndex, t_iMaxLinesPerChunk), 1);
  var t_sLines = t_sRawStr.line.range(t_iStartChunkIndex, t_iEndChunkIndex);
  t_ar_sLineChunks[t_iChunk] = t_sLines;
  }

  var tDelim = theProperty("itemDelimiter");
  setTheProperty("itemDelimiter", "=");
  for (var t_sStr of t_ar_sLineChunks.toArray()) {
  var t_iLineCount = t_sStr.line.count;
  for (var t_iLineNo = 1; t_iLineNo <= t_iLineCount; ++t_iLineNo) {
  var tPair = t_sStr.line[t_iLineNo];
  if (lingoBinary("and", lingoBinary("neq", callNamed("chars", tPair, 1, 1), "#"), lingoBinary("neq", tPair, ""))) {
  var tProp = tPair.item[1];
  var tvalue = tPair.item.range(2, tPair.item.count);
  tvalue = callMethod("convertSpecialChars", tStrServices, tvalue);
  for (var k = 1; k <= tSpecialChunks.count; ++k) {
  var tMark = callMethod("getPropAt", tSpecialChunks, k);
  if (lingoBinary("contains", tvalue, tMark)) {
  tvalue = callMethod("replaceChunks", tStrServices, tvalue, tMark, tSpecialChunks[k]);
  }

  }

  _me.pItemList[callNamed("convertToLowerCase", tProp)] = tvalue;
  }

  }

  }

  setTheProperty("itemDelimiter", tDelim);
  return 1;
}

