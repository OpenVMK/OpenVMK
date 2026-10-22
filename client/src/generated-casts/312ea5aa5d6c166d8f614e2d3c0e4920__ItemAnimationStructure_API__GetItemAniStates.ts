// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / ItemAnimationStructure API / GetItemAniStates

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetItemAniStates(_me: LingoMe, a_sID: LingoValue) {
  return callMethod("GetStates", callNamed("GetItemAniStructureManager"), a_sID);
}

