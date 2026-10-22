// minigame_engine.cct / CIntVector / new

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _new(_me: LingoMe, a_iX: LingoValue, a_iY: LingoValue, a_iZ: LingoValue) {
  setMeProp(_me, "x", callNamed("integer", a_iX));
  setMeProp(_me, "y", callNamed("integer", a_iY));
  setMeProp(_me, "z", callNamed("integer", a_iZ));
  return _me;
}

