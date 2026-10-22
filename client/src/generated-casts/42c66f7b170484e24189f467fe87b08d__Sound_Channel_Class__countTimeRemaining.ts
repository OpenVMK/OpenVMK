// 42c66f7b170484e24189f467fe87b08d.cct / Sound Channel Class / countTimeRemaining

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function countTimeRemaining(_me: LingoMe) {
  setMeProp(_me, "pCounter", lingoBinary("add", meProp(_me, "pCounter"), 10));
  setMeProp(_me, "pDurationLeft", lingoBinary("sub", meProp(_me, "pDurationLeft"), meProp(_me, "pCounter")));
  if (lingoBinary("gt", meProp(_me, "pDurationLeft"), 0)) {
  callMethod("delay", _me, 10, symbol("countTimeRemaining"))
  } else {
  setMeProp(_me, "pDurationLeft", 0);
  }

  callNamed("put", meProp(_me, "pDurationLeft"))
}

