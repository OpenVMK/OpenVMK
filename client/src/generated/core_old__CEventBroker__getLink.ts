// core.old.cct / CEventBroker / getLink

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getLink(_me: LingoMe, _this: LingoValue) {
  if (callNamed("stringp", meProp(_me, "pLink"))) {
  return meProp(_me, "pLink");
  } else {
  return 0;
  }

}

