// core.old.cct / Connection API / unregisterListener

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function unregisterListener(_me: LingoMe, tID: LingoValue, tObjID: LingoValue, tMsgList: LingoValue) {
  return callMethod("unregisterListener", callNamed("getConnectionManager"), tID, tObjID, tMsgList);
}

