// mpa03424.dcr / fr_main / exitFrame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function exitFrame(_me: LingoMe) {
  /* global */ var gMain = globalVar("gMain");
  callMethod("frameEvent", globalVar("gMain"))
  callNamed("go", theProperty("frame"))
}

