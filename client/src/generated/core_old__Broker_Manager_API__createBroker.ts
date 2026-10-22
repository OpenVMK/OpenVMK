// core.old.cct / Broker Manager API / createBroker

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createBroker(_me: LingoMe, a_sMessage: LingoValue) {
  return callMethod("create", callNamed("getBrokerManager"), a_sMessage);
}

