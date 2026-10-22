// core.old.cct / CMgrResource / clearMemNumLists

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function clearMemNumLists(_me: LingoMe) {
  setMeProp(_me, "pAllMemNumList", new LingoPropList([]));
  callMethod("sort", meProp(_me, "pAllMemNumList"))
  return 1;
}

