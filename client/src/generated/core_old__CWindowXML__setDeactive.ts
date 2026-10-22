// core.old.cct / CWindowXML / setDeactive

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setDeactive(_me: LingoMe, _this: LingoValue) {
  if (meProp(_me, "pLock")) {
  return 0;
  } else {
  if (meProp(_me, "pActive")) {
  setMeProp(_me, "pActive", 0);
  return 1;
  } else {
  return 0;
  }

  }

}

