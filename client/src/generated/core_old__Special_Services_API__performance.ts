// core.old.cct / Special Services API / performance

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function performance(_me: LingoMe) {
  if (callNamed("objectExists", symbol("perfTester"))) {
  return callNamed("removeObject", symbol("perfTester"));
  } else {
  return callNamed("createObject", symbol("perfTester"), callNamed("GetClsVariable", "perf.test.class"));
  }

}

