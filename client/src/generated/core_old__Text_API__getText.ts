// core.old.cct / Text API / getText

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getText(_me: LingoMe, tID: LingoValue, tDefault: LingoValue) {
  return callMethod("get", callNamed("getTextManager"), tID, tDefault);
}

