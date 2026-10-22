// minigame_engine.cct / CIntVector / length

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function length(_me: LingoMe) {
  return lingoBinary("div", lingoBinary("add", lingoBinary("add", callNamed("abs", meProp(_me, "x")), callNamed("abs", meProp(_me, "y"))), callNamed("abs", meProp(_me, "z"))), 3);
}

