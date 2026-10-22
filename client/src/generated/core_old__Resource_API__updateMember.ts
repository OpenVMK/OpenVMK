// core.old.cct / Resource API / updateMember

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateMember(_me: LingoMe, a_sName: LingoValue) {
  return callMethod("updateMember", callNamed("getResourceManager"), a_sName);
}

