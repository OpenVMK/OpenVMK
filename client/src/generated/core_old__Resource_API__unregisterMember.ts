// core.old.cct / Resource API / unregisterMember

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function unregisterMember(_me: LingoMe, a_sName: LingoValue) {
  return callMethod("unregisterMember", callNamed("getResourceManager"), a_sName);
}

