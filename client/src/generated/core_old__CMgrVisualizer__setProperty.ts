// core.old.cct / CMgrVisualizer / setProperty

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setProperty(_me: LingoMe, tProp: LingoValue, tvalue: LingoValue) {
  switch (tProp) {
case symbol("defaultLocZ"):
  return callMethod("setDefaultLocZ", _me, tvalue);
case symbol("boundary"):
  return callMethod("setBoundary", _me, tvalue);
  }

  return 0;
}

