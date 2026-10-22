// mpa03424.dcr / pSign / initSprites

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initSprites(_me: LingoMe) {
  setMeProp(_me, "pSignV", lingoBinary("sub", meProp(_me, "pSignToV"), lingoBinary("mul", meProp(_me, "pSpeedV"), 10)));
  setMeProp(_me, "pLoaderV", lingoBinary("sub", meProp(_me, "pLoaderToV"), lingoBinary("mul", meProp(_me, "pSpeedV"), 10)));
}

