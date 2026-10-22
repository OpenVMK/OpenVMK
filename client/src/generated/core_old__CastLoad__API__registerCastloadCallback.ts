// core.old.cct / CastLoad  API / registerCastloadCallback

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function registerCastloadCallback(_me: LingoMe, tID: LingoValue, tMethod: LingoValue, tClientObj: LingoValue, tArgument: LingoValue) {
  return callMethod("registerCallback", callNamed("getCastLoadManager"), tID, tMethod, tClientObj, tArgument);
}

