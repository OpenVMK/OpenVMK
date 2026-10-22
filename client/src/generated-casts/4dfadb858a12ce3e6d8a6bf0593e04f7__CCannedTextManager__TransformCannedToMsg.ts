// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CCannedTextManager / TransformCannedToMsg

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TransformCannedToMsg(_me: LingoMe, a_ar_mp_cannedMap: LingoValue, a_bNoPhraseLength: LingoValue) {
  var tMsg = new LingoPropList([]);
  if ((lingoTruthy(a_bNoPhraseLength) ? 0 : 1)) {
  callMethod("addProp", tMsg, symbol("int"), a_ar_mp_cannedMap.count)
  }

  for (var tEntry of a_ar_mp_cannedMap.toArray()) {
  switch (tEntry.source) {
case symbol("ownName"):
  callMethod("addProp", tMsg, symbol("int"), 0)
  callMethod("addProp", tMsg, symbol("str"), tEntry.word)
  break;
case symbol("friend"):
  switch (tEntry.form) {
case symbol("nominative"):
  callMethod("addProp", tMsg, symbol("int"), -float(1))
  break;
case symbol("genitive"):
  callMethod("addProp", tMsg, symbol("int"), -float(3))
  break;
case symbol("plural"):
  callMethod("addProp", tMsg, symbol("int"), -float(4))
  break;
  default:
  callNamed("error", _me, "Invalid form of friend's name !", symbol("TransformCannedToMsg"))
  }

  callMethod("addProp", tMsg, symbol("int"), tEntry.code)
  break;
case symbol("room"):
  callMethod("addProp", tMsg, symbol("int"), -float(2))
  callMethod("addProp", tMsg, symbol("str"), tEntry.word)
  break;
case symbol("dictionary"):
  if (tEntry.capitalized) {
  callMethod("addProp", tMsg, symbol("int"), -float(1000))
  }

  var tIndex = tEntry.code;
  callMethod("addProp", tMsg, symbol("int"), tIndex)
  break;
case symbol("linefeed"):
  callMethod("addProp", tMsg, symbol("int"), -float(1001))
  break;
  }

  }

  return tMsg;
}

