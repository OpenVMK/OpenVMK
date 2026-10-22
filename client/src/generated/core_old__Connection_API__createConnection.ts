// core.old.cct / Connection API / createConnection

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createConnection(_me: LingoMe, tID: LingoValue, tHost: LingoValue, tPort: LingoValue) {
  return callMethod("create", callNamed("getConnectionManager"), tID, tHost, tPort);
}

