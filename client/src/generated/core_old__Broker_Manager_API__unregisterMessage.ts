// core.old.cct / Broker Manager API / unregisterMessage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function unregisterMessage(_me: LingoMe, a_sMessage: LingoValue, a_sClientID: LingoValue) {
  return callMethod("unregister", callNamed("getBrokerManager"), a_sMessage, a_sClientID);
}

