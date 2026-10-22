// core.old.cct / CEventBroker / mouseUpOutSide

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function mouseUpOutSide(_me: LingoMe, _this: LingoValue) {
  if (callMethod("redirectEvent", _this, symbol("mouseUpOutSide"))) {
  callNamed("stopEvent")
  return 1;
  } else {
  callNamed("pass")
  return 0;
  }

}

