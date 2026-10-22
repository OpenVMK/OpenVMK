// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CAffixExpanderAndConditionEvaluator / ExpandWord

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ExpandWord(_me: LingoMe, i_sDictionaryWord: LingoValue) {
  var t_ar_cFlags = new LingoList([]);
  var t_sBareWord = callMethod("SliceWord", _me, i_sDictionaryWord, t_ar_cFlags);
  var t_ar_out = new LingoList([t_sBareWord]);
  for (var tFlag of t_ar_cFlags.toArray()) {
  callMethod("ExpandFlag", _me, t_sBareWord, tFlag, t_ar_out)
  }

  return t_ar_out;
}

