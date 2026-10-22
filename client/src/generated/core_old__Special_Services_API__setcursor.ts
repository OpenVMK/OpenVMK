// core.old.cct / Special Services API / setcursor

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setcursor(_me: LingoMe, a_kType: LingoValue) {
  return callMethod("setcursor", callNamed("getSpecialServices"), a_kType);
}

