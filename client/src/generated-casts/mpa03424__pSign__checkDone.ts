// mpa03424.dcr / pSign / checkDone

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function checkDone(_me: LingoMe) {
  if (lingoBinary("and", lingoBinary("eq", meProp(_me, "pStatus"), symbol("fadeup")), lingoBinary("gt", meProp(_me, "pTime"), 113))) {
  return 1;
  }

}

