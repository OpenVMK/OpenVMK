// c7d81c175a2637e0193f0cf7bfd014ba.cct / ItemAnimationStructure API / CreateItemAniStructure

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateItemAniStructure(_me: LingoMe, a_sID: LingoValue, a_rInitField: LingoValue) {
  return callMethod("create", callNamed("GetItemAniStructureManager"), a_sID, a_rInitField);
}

