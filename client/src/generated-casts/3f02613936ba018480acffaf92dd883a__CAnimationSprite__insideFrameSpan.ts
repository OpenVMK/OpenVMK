// 3f02613936ba018480acffaf92dd883a.cct / CAnimationSprite / insideFrameSpan

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function insideFrameSpan(_me: LingoMe, i_frameIndex: LingoValue) {
  if (lingoBinary("and", lingoBinary("gte", i_frameIndex, callMethod("GetParam", _me, symbol("startFrame"))), lingoBinary("lte", i_frameIndex, callMethod("GetParam", _me, symbol("endFrame"))))) {
  return 1;
  } else {
  return 0;
  }

}

