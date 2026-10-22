// 2230483a2e5366aa24e52c1b02d9674c.cct /  / setDecoder

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setDecoder(_me: LingoMe, tDecoder: LingoValue) {
  /* global */ var pChars = globalVar("pChars");
  /* global */ var pCharsI = globalVar("pCharsI");
  /* global */ var pFirst = globalVar("pFirst");
  if ((lingoTruthy(callNamed("objectp", tDecoder)) ? 0 : 1)) {
  return callNamed("error", _me, lingoBinary("joinPad", "Decoder object expected:", tDecoder), symbol("setDecoder"));
  } else {
  setThePropOf(_me, "pDecoder", tDecoder);
  }

  return 1;
}

