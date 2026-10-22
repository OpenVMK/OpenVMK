// mpa03424.dcr / pBoing / setBounce

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setBounce(_me: LingoMe, inPower: LingoValue) {
  setMeProp(_me, "pVeloc", inPower);
  callMethod("resetVal", _me)
  setMeProp(_me, "pStatus", symbol("bounce"));
}

