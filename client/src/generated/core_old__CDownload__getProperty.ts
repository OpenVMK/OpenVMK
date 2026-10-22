// core.old.cct / CDownload / getProperty

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
case symbol("status"):
  return meProp(_me, "pStatus");
case symbol("Percent"):
  return meProp(_me, "pPercent");
case symbol("url"):
  return meProp(_me, "pURL");
case symbol("type"):
  return meProp(_me, "pType");
  }

  return 0;
}

