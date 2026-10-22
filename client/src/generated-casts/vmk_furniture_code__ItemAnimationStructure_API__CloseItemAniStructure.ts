// vmk_furniture_code.cct / ItemAnimationStructure API / CloseItemAniStructure

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CloseItemAniStructure(_me: LingoMe, a_vCastNumOrID: LingoValue) {
  return callMethod("CloseAnimation", callNamed("GetItemAniStructureManager"), a_vCastNumOrID);
}

