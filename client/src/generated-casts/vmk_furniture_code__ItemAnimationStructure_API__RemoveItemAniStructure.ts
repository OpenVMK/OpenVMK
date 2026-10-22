// vmk_furniture_code.cct / ItemAnimationStructure API / RemoveItemAniStructure

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemoveItemAniStructure(_me: LingoMe, a_sID: LingoValue) {
  return callMethod("Remove", callNamed("GetItemAniStructureManager"), a_sID);
}

