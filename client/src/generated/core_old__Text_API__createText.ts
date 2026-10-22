// core.old.cct / Text API / createText

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createText(_me: LingoMe, tID: LingoValue, tvalue: LingoValue) {
  return callMethod("create", callNamed("getTextManager"), tID, tvalue);
}

