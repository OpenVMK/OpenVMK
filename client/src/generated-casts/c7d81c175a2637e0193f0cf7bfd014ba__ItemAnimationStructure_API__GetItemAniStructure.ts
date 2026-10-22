// c7d81c175a2637e0193f0cf7bfd014ba.cct / ItemAnimationStructure API / GetItemAniStructure

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetItemAniStructure(_me: LingoMe, a_sID: LingoValue) {
  return callMethod("get", callNamed("GetItemAniStructureManager"), a_sID);
}

