// core.old.cct / CEventBroker / setLink

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setLink(_me: LingoMe, _this: LingoValue, tUrlOrKey: LingoValue) {
  if (callNamed("stringp", tUrlOrKey)) {
  setMeProp(_me, "pLink", tUrlOrKey);
  return 1;
  } else {
  return 0;
  }

}

