// vmk_furniture_code.cct / ItemAnimationStructure API / InitItemAniStructure

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function InitItemAniStructure(_me: LingoMe, a_vCastNumOrMemName: LingoValue) {
  return callMethod("InitAnimation", callNamed("GetItemAniStructureManager"), a_vCastNumOrMemName);
}

