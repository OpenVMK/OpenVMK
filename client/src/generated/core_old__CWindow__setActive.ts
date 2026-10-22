// core.old.cct / CWindow / setActive

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setActive(_me: LingoMe, _this: LingoValue) {
  if (!lingoTruthy(meProp(_me, "pActive"))) {
  setMeProp(_me, "pActive", 1);
  return 1;
  } else {
  return 0;
  }

}

