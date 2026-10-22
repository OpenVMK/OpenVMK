// 2230483a2e5366aa24e52c1b02d9674c.cct / CCannedTextNew / TransformCannedToMsg

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TransformCannedToMsg(_me: LingoMe, a_ar_mp_cannedMap: LingoValue, a_bNoPhraseLength: LingoValue) {
  callNamed("trace", lingoBinary("joinPad", lingoBinary("joinPad", "TransformCannedToMsg()", a_ar_mp_cannedMap), a_bNoPhraseLength))
  var t_sStr = "";
  for (var i = 1; i <= a_ar_mp_cannedMap.count; ++i) {
  if (lingoBinary("and", lingoBinary("and", a_ar_mp_cannedMap[i].capitalized, lingoBinary("gt", callNamed("charToNum", a_ar_mp_cannedMap[i].word.char[1]), 96)), lingoBinary("lt", callNamed("charToNum", a_ar_mp_cannedMap[i].word.char[1]), 123))) {
  t_sStr = lingoBinary("join", lingoBinary("join", t_sStr, callNamed("numToChar", lingoBinary("sub", callNamed("charToNum", a_ar_mp_cannedMap[i].word.char[1]), 32))), a_ar_mp_cannedMap[i].word.char.range(2, a_ar_mp_cannedMap[i].word.length));
  continue;
  }

  t_sStr = lingoBinary("join", t_sStr, a_ar_mp_cannedMap[i].word);
  }

  return callNamed("propList", symbol("str"), t_sStr);
}

