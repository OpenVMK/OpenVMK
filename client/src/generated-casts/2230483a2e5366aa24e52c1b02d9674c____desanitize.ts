// 2230483a2e5366aa24e52c1b02d9674c.cct /  / desanitize

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function desanitize(_me: LingoMe, str: LingoValue) {
  /* global */ var pChars = globalVar("pChars");
  /* global */ var pCharsI = globalVar("pCharsI");
  /* global */ var pFirst = globalVar("pFirst");
  var t_sStr = "";
  for (var c = 1; c <= str.length; ++c) {
  t_sStr = lingoBinary("join", t_sStr, callNamed("numToChar", lingoBinary("add", globalVar("pCharsI")[str.char[c]], lingoBinary("mul", globalVar("pCharsI")[str.char[lingoBinary("add", c, 1)]], 16))));
  c = lingoBinary("add", c, 1);
  }

  return t_sStr;
}

