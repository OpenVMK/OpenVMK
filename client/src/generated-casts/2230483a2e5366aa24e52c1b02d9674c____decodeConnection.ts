// 2230483a2e5366aa24e52c1b02d9674c.cct /  / decodeConnection

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function decodeConnection(_me: LingoMe, ip: LingoValue) {
  /* global */ var pChars = globalVar("pChars");
  /* global */ var pCharsI = globalVar("pCharsI");
  /* global */ var pFirst = globalVar("pFirst");
  var tStr = "";
  for (var i = 1; i <= ip.count; ++i) {
  tStr = lingoBinary("join", lingoBinary("join", tStr, ip[i]), ".");
  }

  return tStr.char.range(1, lingoBinary("sub", tStr.length, 1));
}

