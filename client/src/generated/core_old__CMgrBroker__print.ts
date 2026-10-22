// core.old.cct / CMgrBroker / print

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function print(_me: LingoMe, tMessage: LingoValue) {
  for (var i = 1; i <= _me.pItemList.count; ++i) {
  callNamed("put", callMethod("getPropAt", _me.pItemList, i))
  for (var j = 1; j <= _me.pItemList[i].count; ++j) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("join", "\t", callMethod("getPropAt", _me.pItemList[i], j)), "->"), _me.pItemList[i][j]))
  }

  }

  return 1;
}

