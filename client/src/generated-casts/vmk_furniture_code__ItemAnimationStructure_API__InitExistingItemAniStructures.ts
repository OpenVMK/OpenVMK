// vmk_furniture_code.cct / ItemAnimationStructure API / InitExistingItemAniStructures

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function InitExistingItemAniStructures(_me: LingoMe) {
  return callMethod("initAll", callNamed("GetItemAniStructureManager"));
}

