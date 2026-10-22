// core.old.cct / Core Thread API / closeThread

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function closeThread(_me: LingoMe, a_vCastNumOrID: LingoValue) {
  return callMethod("closeThread", callNamed("getThreadManager"), a_vCastNumOrID);
}

