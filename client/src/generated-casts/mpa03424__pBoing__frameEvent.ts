// mpa03424.dcr / pBoing / frameEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function frameEvent(_me: LingoMe) {
  if (lingoBinary("eq", meProp(_me, "pStatus"), symbol("bounce"))) {
  callMethod("bounce", _me)
  return 1;
  } else {
  return 0;
  }

}

