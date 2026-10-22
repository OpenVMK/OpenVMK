// core.old.cct / CWindowFieldWrapper / setText

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setText(_me: LingoMe, tText: LingoValue) {
  if (!lingoTruthy(callNamed("stringp", tText))) {
  tText = callNamed("string", tText);
  }

  setThePropOf(meProp(_me, "pMember"), "text", tText);
  return 1;
}

