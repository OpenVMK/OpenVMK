// mpa03424.dcr / pBoing / resetVal

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function resetVal(_me: LingoMe) {
  setMeProp(_me, "pPos", -float(10));
  setMeProp(_me, "pDest", 0);
  setMeProp(_me, "pVeloc", 0);
}

