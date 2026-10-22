// vmk_furniture_code.cct / ItemAnimationStructure API / CloseExistingItemAniStructures

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CloseExistingItemAniStructures(_me: LingoMe) {
  return callMethod("closeAll", callNamed("GetItemAniStructureManager"));
}

