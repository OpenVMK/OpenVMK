// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CCannedTextManager / SpliceString

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SpliceString(_me: LingoMe, i_sText: LingoValue) {
  var tOut = new LingoList([]);
  var tCurrentWord = "";
  var t_iChars = chunkCount(i_sText, "char");
  for (var i = 1; i <= t_iChars; ++i) {
  var tChar = chunkOf(i_sText, "char", i, 0);
  if (callMethod("isSeparator", _me, tChar)) {
  if (lingoBinary("neq", tCurrentWord, "")) {
  callMethod("append", tOut, tCurrentWord)
  }

  callMethod("append", tOut, callNamed("string", tChar))
  tCurrentWord = "";
  continue;
  }

  tCurrentWord = lingoBinary("join", tCurrentWord, tChar);
  }

  if (lingoBinary("neq", tCurrentWord, "")) {
  callMethod("append", tOut, tCurrentWord)
  }

  return tOut;
}

