// c7d81c175a2637e0193f0cf7bfd014ba.cct / CItemAniStructureManager / GetStates

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetStates(_me: LingoMe, tID: LingoValue) {
  return callMethod("GetStates", callMethod("get", _me, tID));
}

