// core.old.cct / CastLoad  API / RemoveCastLib

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemoveCastLib(_me: LingoMe, tCastName: LingoValue) {
  return callMethod("RemoveCastLib", callNamed("getCastLoadManager"), tCastName);
}

