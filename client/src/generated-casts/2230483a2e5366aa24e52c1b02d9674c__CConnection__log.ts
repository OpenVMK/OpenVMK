// 2230483a2e5366aa24e52c1b02d9674c.cct / CConnection / log

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function log(_me: LingoMe, tMsg: LingoValue) {
  /* global */ var pChars = globalVar("pChars");
  /* global */ var pCharsI = globalVar("pCharsI");
  /* global */ var pFirst = globalVar("pFirst");
  var Variable_0_1 = 0;
  if (lingoBinary("eq", Variable_0_1, 1)) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("join", lingoBinary("joinPad", "[", callNamed("getID", _me)), "] :"), tMsg))
  }

}

