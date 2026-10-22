// vmk_tutorial.cct / CJungleCruiseComponent / StageFinished

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StageFinished(_me: LingoMe) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_boat"))) ? 0 : 1)) {
  if (callMethod("GetParam", meProp(_me, "m_boat"), "StageOver")) {
  return 1;
  } else {
  return 0;
  }

  }

  return 1;
}

