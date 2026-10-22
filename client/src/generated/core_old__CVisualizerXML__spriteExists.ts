// core.old.cct / CVisualizerXML / spriteExists

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function spriteExists(_me: LingoMe, tID: LingoValue) {
  return !lingoTruthy(callNamed("voidp", meProp(_me, "pActSprList")[tID]));
}

