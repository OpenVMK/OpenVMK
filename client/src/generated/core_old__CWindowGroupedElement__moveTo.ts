// core.old.cct / CWindowGroupedElement / moveTo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function moveTo(_me: LingoMe, tLocX: LingoValue, tLocY: LingoValue) {
  setMeProp(_me, "pLocX", tLocX);
  setMeProp(_me, "pLocY", tLocY);
  callMethod("render", _me)
}

