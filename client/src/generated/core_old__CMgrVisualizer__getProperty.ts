// core.old.cct / CMgrVisualizer / getProperty

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getProperty(_me: LingoMe, tProp: LingoValue) {
  switch (tProp) {
case symbol("defaultLocZ"):
  return meProp(_me, "pDefaultLocZ");
case symbol("boundary"):
  return meProp(_me, "pBoundary");
case symbol("count"):
  return _me.pItemList.count;
  }

  return 0;
}

