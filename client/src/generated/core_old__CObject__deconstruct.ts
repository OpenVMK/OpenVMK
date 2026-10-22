// core.old.cct / CObject / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if (lingoBinary("gt", callNamed("count", meProp(_me, "delays")), 0)) {
  for (var i = 1; i <= callNamed("count", meProp(_me, "delays")); ++i) {
  callMethod("forget", callNamed("timeout", callMethod("getPropAt", meProp(_me, "delays"), i)))
  }

  }

  setMeProp(_me, "delays", new LingoPropList([]));
  return 1;
}

