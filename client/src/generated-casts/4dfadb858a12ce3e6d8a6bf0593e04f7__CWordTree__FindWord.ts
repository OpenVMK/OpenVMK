// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CWordTree / FindWord

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function FindWord(_me: LingoMe, _this: LingoValue, a_cWord: LingoValue) {
  var t_ar_cArrPtr = meProp(_me, "m_mp_cCharTable");
  var t_iLength = a_cWord.length;
  var t_cReturn = "";
  for (var i = 1; i <= t_iLength; ++i) {
  var t_cNext = chunkOf(a_cWord, "char", i, 0);
  t_ar_cArrPtr = callMethod("getaProp", t_ar_cArrPtr, t_cNext);
  if (callNamed("voidp", t_ar_cArrPtr)) {
  return t_cReturn;
  }

  t_cReturn = t_cReturn + t_cNext;
  }

  if (callNamed("voidp", callMethod("getaProp", t_ar_cArrPtr, meProp(_me, "m_cTerminator")))) {
  while (1) {
  if (lingoBinary("eq", t_ar_cArrPtr.count, 0)) {
  break;
  }

  t_cNext = callMethod("getPropAt", t_ar_cArrPtr, 1);
  if (lingoBinary("eq", t_cNext, meProp(_me, "m_cTerminator"))) {
  break;
  }

  t_cReturn = t_cReturn + t_cNext;
  t_ar_cArrPtr = callMethod("getaProp", t_ar_cArrPtr, t_cNext);
  }

  }

  return t_cReturn;
}

