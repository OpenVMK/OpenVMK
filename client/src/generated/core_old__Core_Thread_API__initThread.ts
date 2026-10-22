// core.old.cct / Core Thread API / initThread

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initThread(_me: LingoMe, a_vCastNumOrMemName: LingoValue) {
  return callMethod("initThread", callNamed("getThreadManager"), a_vCastNumOrMemName);
}

