// core.old.cct / CMgrDownload / exists

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function exists(_me: LingoMe, tMemName: LingoValue) {
  return lingoBinary("or", !lingoTruthy(callNamed("voidp", meProp(_me, "pTaskQueue")[tMemName])), !lingoTruthy(callNamed("voidp", meProp(_me, "pActiveTasks")[tMemName])));
}

