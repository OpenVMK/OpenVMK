// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CWordTree / AppendWords

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AppendWords(_me: LingoMe, _this: LingoValue, a_ar_cWords: LingoValue) {
  for (var t_cWord of a_ar_cWords.toArray()) {
  var t_ar_cArrPtr = meProp(_me, "m_mp_cCharTable");
  var t_iLength = t_cWord.length;
  for (var i = 1; i <= t_iLength; ++i) {
  var t_cChar = chunkOf(t_cWord, "char", i, 0);
  var t_ar_cNewPtr = callMethod("getaProp", t_ar_cArrPtr, t_cChar);
  if (callNamed("voidp", t_ar_cNewPtr)) {
  t_ar_cNewPtr = new LingoPropList([]);
  callMethod("sort", t_ar_cNewPtr)
  callMethod("setaProp", t_ar_cArrPtr, t_cChar, t_ar_cNewPtr)
  }

  t_ar_cArrPtr = t_ar_cNewPtr;
  if (lingoBinary("eq", i, t_iLength)) {
  callMethod("setaProp", t_ar_cArrPtr, meProp(_me, "m_cTerminator"), new LingoPropList([]))
  }

  }

  }

  return 1;
}

