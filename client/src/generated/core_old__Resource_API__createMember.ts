// core.old.cct / Resource API / createMember

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createMember(_me: LingoMe, a_sName: LingoValue, a_kType: LingoValue) {
  return callMethod("createMember", callNamed("getResourceManager"), a_sName, a_kType);
}

