// core.old.cct / Text API / dumpTextField

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dumpTextField(_me: LingoMe, tField: LingoValue, tDelimiter: LingoValue) {
  return callMethod("dump", callNamed("getTextManager"), tField, tDelimiter);
}

