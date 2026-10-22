// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / CItemAniStructureManager / print

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function print(_me: LingoMe) {
  var tListMode = callNamed("ilk", _me.pItemList);
  for (var i = 1; i <= _me.pItemList.count; ++i) {
  if (lingoBinary("eq", tListMode, symbol("list"))) {
  var tID = _me.pItemList[i];
  } else {
  tID = callMethod("getPropAt", _me.pItemList, i);
  }

  var tObj = callMethod("get", _me, tID);
  if (callNamed("symbolp", tID)) {
  tID = lingoBinary("join", "#", tID);
  }

  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", tID, ":"), tObj))
  }

  return 1;
}

