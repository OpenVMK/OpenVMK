// core.old.cct / CWindowPatternWrapper / moveBy

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function moveBy(_me: LingoMe, tX: LingoValue, tY: LingoValue) {
  setThePropOf(_me, "pLocX", lingoBinary("add", _me.pLocX, tX));
  setThePropOf(_me, "pLocY", lingoBinary("add", _me.pLocY, tY));
  callMethod("render", _me)
}

