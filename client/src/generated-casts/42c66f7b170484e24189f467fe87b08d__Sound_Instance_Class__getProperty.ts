// 42c66f7b170484e24189f467fe87b08d.cct / Sound Instance Class / getProperty

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getProperty(_me: LingoMe, tProp: LingoValue) {
  if ((lingoTruthy(callNamed("listp", tProp)) ? 0 : 1)) {
  return 0;
  }

  switch (tProp) {
case symbol("loopCount"):
  return meProp(_me, "pProps")[symbol("loopCount")];
case symbol("infiniteloop"):
  return meProp(_me, "pProps")[symbol("infiniteloop")];
case symbol("volume"):
  return meProp(_me, "pProps")[symbol("volume")];
  }

  return 0;
}

