// core.old.cct / CConnectionDebug / setDecoder

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setDecoder(_me: LingoMe, tDecoder: LingoValue) {
  if (!lingoTruthy(callNamed("objectp", tDecoder))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Decoder object expected:", tDecoder), symbol("setDecoder"));
  } else {
  setMeProp(_me, "pDecoder", tDecoder);
  return 1;
  }

}

