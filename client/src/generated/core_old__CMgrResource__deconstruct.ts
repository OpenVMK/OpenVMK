// core.old.cct / CMgrResource / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if (lingoBinary("contains", theProperty("runMode"), "Author")) {
  callMethod("deleteDynamicMembers", _me)
  }

  setMeProp(_me, "pAllMemNumList", new LingoPropList([]));
  return 1;
}

