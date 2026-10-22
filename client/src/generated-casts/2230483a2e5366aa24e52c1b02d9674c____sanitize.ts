// 2230483a2e5366aa24e52c1b02d9674c.cct /  / sanitize

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function sanitize(_me: LingoMe, str: LingoValue) {
  /* global */ var pChars = globalVar("pChars");
  /* global */ var pCharsI = globalVar("pCharsI");
  /* global */ var pFirst = globalVar("pFirst");
  var t_sStr = "";
  for (var c = 1; c <= str.length; ++c) {
  t_sStr = lingoBinary("join", lingoBinary("join", t_sStr, globalVar("pChars")[lingoBinary("add", callNamed("bitAnd", callNamed("bitOr", callNamed("charToNum", str.char[c]), 16), 15), 1)]), globalVar("pChars")[lingoBinary("add", callNamed("bitAnd", callNamed("bitOr", lingoBinary("div", callNamed("charToNum", str.char[c]), 16), 16), 15), 1)]);
  }

  return t_sStr;
}

