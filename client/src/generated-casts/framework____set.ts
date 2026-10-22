// framework.dcr /  / set

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _set(_me: LingoMe, stage: LingoValue) {
  if (stage.tSession) {
  setThePropOf(stage, "tSession", 0);
  callNamed("loc")
  }

  callMethod("image", theProperty("locZ"), stage)
  callNamed("trace", 1)
}

