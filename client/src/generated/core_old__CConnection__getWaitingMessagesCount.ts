// core.old.cct / CConnection / getWaitingMessagesCount

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getWaitingMessagesCount(_me: LingoMe) {
  return callMethod("getNumberWaitingNetMessages", meProp(_me, "pXtra"));
}

