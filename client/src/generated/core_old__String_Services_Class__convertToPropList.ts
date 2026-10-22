// core.old.cct / String Services Class / convertToPropList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function convertToPropList(_me: LingoMe, tStr: LingoValue, tDelim: LingoValue) {
  var tOldDelim = theProperty("itemDelimiter");
  if (lingoBinary("eq", tDelim, undefined)) {
  tDelim = ",";
  }

  setTheProperty("itemDelimiter", tDelim);
  var tProps = new LingoPropList([]);
  for (var i = 1; i <= tStr.item.count; ++i) {
  var tPair = tStr.item[i].word.range(1, tStr.item[i].word.count);
  var tProp = tPair.char.range(1, lingoBinary("sub", callNamed("offset", "=", tPair), 1));
  var tvalue = tPair.char.range(lingoBinary("add", callNamed("offset", "=", tPair), 1), callNamed("length", tStr));
  tProps[tProp.word.range(1, tProp.word.count)] = tvalue.word.range(1, tvalue.word.count);
  }

  setTheProperty("itemDelimiter", tOldDelim);
  return tProps;
}

