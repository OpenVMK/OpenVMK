// 2230483a2e5366aa24e52c1b02d9674c.cct / CMonorailHandler2 / new

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _new(_me: LingoMe) {
  /* global */ var pChars = globalVar("pChars");
  /* global */ var pCharsI = globalVar("pCharsI");
  setTheProperty("trace", 0);
  setTheProperty("traceLoad", 0);
  setThePropOf(_me, "pBase64", callMethod("new", callNamed("script", "Base64")));
  return _me;
}

