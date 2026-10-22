// core.old.cct / String Services API / convertToPropList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function convertToPropList(_me: LingoMe, a_sString: LingoValue, a_sDelimiter: LingoValue) {
  var t_sOldDelim = theProperty("itemDelimiter");
  if (callNamed("voidp", a_sDelimiter)) {
  a_sDelimiter = ",";
  }

  setTheProperty("itemDelimiter", a_sDelimiter);
  var t_mp_sKey_sValue = new LingoPropList([]);
  for (var i = 1; i <= a_sString.item.count; ++i) {
  var t_sPair = a_sString.item[i].word.range(1, a_sString.item[i].word.count);
  var t_sProp = t_sPair.char.range(1, lingoBinary("sub", callNamed("offset", "=", t_sPair), 1));
  var t_sValue = t_sPair.char.range(lingoBinary("add", callNamed("offset", "=", t_sPair), 1), callNamed("length", a_sString));
  t_mp_sKey_sValue[t_sProp.word.range(1, t_sProp.word.count)] = t_sValue.word.range(1, t_sValue.word.count);
  }

  setTheProperty("itemDelimiter", t_sOldDelim);
  return t_mp_sKey_sValue;
}

