// core.old.cct / CMgrResource / unregisterMember

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function unregisterMember(_me: LingoMe, tMemName: LingoValue) {
  if (callNamed("voidp", meProp(_me, "pAllMemNumList")[tMemName])) {
  return 0;
  }

  callMethod("deleteProp", meProp(_me, "pAllMemNumList"), tMemName)
  return 1;
}

