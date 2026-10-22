// core.old.cct / CDownload / addCallBack

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addCallBack(_me: LingoMe, tMemName: LingoValue, tCallback: LingoValue) {
  if (lingoBinary("eq", tMemName, meProp(_me, "pMemName"))) {
  setMeProp(_me, "pCallBack", tCallback);
  return 1;
  } else {
  return 0;
  }

}

