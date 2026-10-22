// core.old.cct / Timeout API / createTimeout

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createTimeout(_me: LingoMe, tID: LingoValue, tTime: LingoValue, tHandler: LingoValue, tClientID: LingoValue, tArguments: LingoValue, tIterations: LingoValue) {
  return callMethod("create", callNamed("getTimeoutManager"), tID, tTime, tHandler, tClientID, tArguments, tIterations);
}

