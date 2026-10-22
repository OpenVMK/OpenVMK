// core.old.cct / CWindowFieldWrapper / adjustOffsetTo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function adjustOffsetTo(_me: LingoMe, tX: LingoValue, tY: LingoValue) {
  setMeProp(_me, "pOffX", tX);
  setMeProp(_me, "pOffY", tY);
  if (!lingoTruthy(meProp(_me, "pUpdateLock"))) {
  callMethod("clearImage", _me)
  callMethod("render", _me)
  }

}

