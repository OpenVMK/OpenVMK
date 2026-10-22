// core.old.cct / CMgrResource / replaceMember

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function replaceMember(_me: LingoMe, tExistingMemName: LingoValue, tReplacingMemName: LingoValue) {
  if (callNamed("voidp", meProp(_me, "pAllMemNumList")[tReplacingMemName])) {
  return 0;
  }

  meProp(_me, "pAllMemNumList")[tExistingMemName] = meProp(_me, "pAllMemNumList")[tReplacingMemName];
  return 1;
}

