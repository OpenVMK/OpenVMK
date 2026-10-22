// core.old.cct / Connection API / unregisterCommands

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function unregisterCommands(_me: LingoMe, tID: LingoValue, tObjID: LingoValue, tCmdList: LingoValue) {
  return callMethod("unregisterCommands", callNamed("getConnectionManager"), tID, tObjID, tCmdList);
}

