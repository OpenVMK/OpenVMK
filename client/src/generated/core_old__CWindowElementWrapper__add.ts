// core.old.cct / CWindowElementWrapper / add

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function add(_me: LingoMe, _this: LingoValue, tElement: LingoValue) {
  if (!lingoTruthy(callNamed("objectp", tElement))) {
  return 0;
  }

  if (lingoBinary("neq", callMethod("getProperty", tElement, symbol("scaleH")), symbol("fixed"))) {
  setMeProp(_me, "pScaleH", symbol("scale"));
  }

  if (lingoBinary("neq", callMethod("getProperty", tElement, symbol("scaleV")), symbol("fixed"))) {
  setMeProp(_me, "pScaleV", symbol("scale"));
  }

  callMethod("add", meProp(_me, "pElemList"), tElement)
  return 1;
}

