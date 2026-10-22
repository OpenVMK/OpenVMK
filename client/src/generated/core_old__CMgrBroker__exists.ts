// core.old.cct / CMgrBroker / exists

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function exists(_me: LingoMe, tMessage: LingoValue) {
  return !lingoTruthy(callNamed("voidp", _me.pItemList[tMessage]));
}

