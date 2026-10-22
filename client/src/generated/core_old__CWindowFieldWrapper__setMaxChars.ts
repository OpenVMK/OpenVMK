// core.old.cct / CWindowFieldWrapper / setMaxChars

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setMaxChars(_me: LingoMe, t_MaxChars: LingoValue) {
  setMeProp(_me, "maxChars", t_MaxChars);
}

