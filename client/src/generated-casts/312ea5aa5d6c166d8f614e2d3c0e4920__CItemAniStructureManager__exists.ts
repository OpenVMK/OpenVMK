// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / CItemAniStructureManager / exists

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function exists(_me: LingoMe, tID: LingoValue) {
  return lingoBinary("gt", callMethod("getOne", _me.pItemList, tID), 0);
}

