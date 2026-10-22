// vmk_casual_checkers.cct / CCheckersGameDialog / GetWindowInstance

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetWindowInstance(_me: LingoMe, _this: LingoValue) {
  return callNamed("getWindow", meProp(_me, "m_sWindow"));
}

