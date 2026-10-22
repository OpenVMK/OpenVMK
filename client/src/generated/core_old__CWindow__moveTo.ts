// core.old.cct / CWindow / moveTo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function moveTo(_me: LingoMe, _this: LingoValue, a_iX: LingoValue, a_iY: LingoValue) {
  callMethod("moveBy", _this, lingoBinary("sub", a_iX, meProp(_me, "pLocX")), lingoBinary("sub", a_iY, meProp(_me, "pLocY")))
}

