// core.old.cct / Broker Manager API / registerMessage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function registerMessage(_me: LingoMe, a_sMessage: LingoValue, a_sClientID: LingoValue, a_kMethod: LingoValue) {
  return callMethod("register", callNamed("getBrokerManager"), a_sMessage, a_sClientID, a_kMethod);
}

