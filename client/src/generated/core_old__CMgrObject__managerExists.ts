// core.old.cct / CMgrObject / managerExists

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function managerExists(_me: LingoMe, _this: LingoValue, tID: LingoValue) {
  return lingoBinary("neq", callMethod("getOne", meProp(_me, "pManagerList"), tID), 0);
}

