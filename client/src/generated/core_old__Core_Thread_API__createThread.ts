// core.old.cct / Core Thread API / createThread

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createThread(_me: LingoMe, a_sID: LingoValue, a_rInitField: LingoValue) {
  return callMethod("create", callNamed("getThreadManager"), a_sID, a_rInitField);
}

