// mpa03424.dcr / pSign / frameEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function frameEvent(_me: LingoMe) {
  if (lingoBinary("eq", meProp(_me, "pStatus"), symbol("fadeUpCloud"))) {
  callMethod("doFadeUpCloud", _me)
  } else {
  if (lingoBinary("eq", meProp(_me, "pStatus"), symbol("fadeup"))) {
  callMethod("doFadeUp", _me)
  }

  }

}

