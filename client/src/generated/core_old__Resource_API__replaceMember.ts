// core.old.cct / Resource API / replaceMember

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function replaceMember(_me: LingoMe, a_sExistingMemName: LingoValue, a_sReplacingMemName: LingoValue) {
  return callMethod("replaceMember", callNamed("getResourceManager"), a_sExistingMemName, a_sReplacingMemName);
}

