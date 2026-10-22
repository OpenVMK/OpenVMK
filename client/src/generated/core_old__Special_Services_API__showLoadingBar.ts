// core.old.cct / Special Services API / showLoadingBar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showLoadingBar(_me: LingoMe, a_sLoadID: LingoValue, a_mp_Props: LingoValue) {
  return callMethod("showLoadingBar", callNamed("getSpecialServices"), a_sLoadID, a_mp_Props);
}

