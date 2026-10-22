// core.old.cct / CVisualizerXML / moveTo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function moveTo(_me: LingoMe, tX: LingoValue, tY: LingoValue) {
  callMethod("moveBy", _me, lingoBinary("sub", tX, meProp(_me, "pLocX")), lingoBinary("sub", tY, meProp(_me, "pLocY")))
}

