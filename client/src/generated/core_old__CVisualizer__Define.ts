// core.old.cct / CVisualizer / Define

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Define(_me: LingoMe, tProps: LingoValue) {
  if (callNamed("voidp", tProps)) {
  return 0;
  }

  if (!lingoTruthy(callNamed("voidp", tProps[symbol("locX")]))) {
  setMeProp(_me, "pLocX", tProps[symbol("locX")]);
  }

  if (!lingoTruthy(callNamed("voidp", tProps[symbol("locY")]))) {
  setMeProp(_me, "pLocY", tProps[symbol("locY")]);
  }

  if (!lingoTruthy(callNamed("voidp", tProps[symbol("locZ")]))) {
  setMeProp(_me, "pLocZ", tProps[symbol("locZ")]);
  }

  if (!lingoTruthy(callNamed("voidp", tProps[symbol("layout")]))) {
  setMeProp(_me, "pLayout", tProps[symbol("layout")]);
  }

  if (!lingoTruthy(callNamed("voidp", tProps[symbol("boundary")]))) {
  setMeProp(_me, "pBoundary", tProps[symbol("boundary")]);
  }

  return callMethod("open", _me, meProp(_me, "pLayout"));
}

