// core.old.cct / CMgrObject / pauseUpdate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function pauseUpdate(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "pTimeOut"))) {
  callMethod("forget", meProp(_me, "pTimeOut"))
  setMeProp(_me, "pTimeOut", undefined);
  }

  setMeProp(_me, "pUpdatePause", 1);
  return 1;
}

