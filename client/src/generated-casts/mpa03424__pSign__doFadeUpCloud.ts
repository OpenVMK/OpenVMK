// mpa03424.dcr / pSign / doFadeUpCloud

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function doFadeUpCloud(_me: LingoMe) {
  setMeProp(_me, "pTime", lingoBinary("add", meProp(_me, "pTime"), 1));
  if (lingoBinary("eq", meProp(_me, "pTime"), 35)) {
  setMeProp(_me, "pTime", 0);
  setMeProp(_me, "pStatus", symbol("fadeup"));
  }

  callMethod("doCloud", _me)
}

