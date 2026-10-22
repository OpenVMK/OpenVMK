// core.old.cct / CEventBroker / keyDown

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function keyDown(_me: LingoMe, _this: LingoValue) {
  if (callMethod("redirectEvent", _this, symbol("keyDown"))) {
  return 1;
  }

  callNamed("pass")
}

