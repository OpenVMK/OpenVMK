// 2230483a2e5366aa24e52c1b02d9674c.cct / CMonorailHandler2 / decipher

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function decipher(_me: LingoMe, tdata: LingoValue, tMode: LingoValue) {
  /* global */ var pChars = globalVar("pChars");
  /* global */ var pCharsI = globalVar("pCharsI");
  setTheProperty("trace", 0);
  setTheProperty("traceLoad", 0);
  var tCipher = "";
  var a = 1;
  while (lingoBinary("lte", a, callNamed("length", tdata))) {
  setThePropOf(_me, "i", lingoBinary("mod", lingoBinary("add", _me.i, 1), 256));
  setThePropOf(_me, "j", lingoBinary("mod", lingoBinary("add", _me.j, _me.pSBox[lingoBinary("add", _me.i, 1)]), 256));
  var temp = _me.pSBox[lingoBinary("add", _me.i, 1)];
  _me.pSBox[lingoBinary("add", _me.i, 1)] = _me.pSBox[lingoBinary("add", _me.j, 1)];
  _me.pSBox[lingoBinary("add", _me.j, 1)] = temp;
  var d = _me.pSBox[lingoBinary("add", lingoBinary("mod", lingoBinary("add", _me.pSBox[lingoBinary("add", _me.i, 1)], _me.pSBox[lingoBinary("add", _me.j, 1)]), 256), 1)];
  var t = callNamed("charToNum", callMethod("desanitize", _me, lingoBinary("join", tdata.char[a], tdata.char[lingoBinary("add", a, 1)])));
  tCipher = lingoBinary("join", tCipher, callNamed("numToChar", callNamed("bitXor", t, d)));
  a = lingoBinary("add", a, 2);
  }

  return tCipher;
}

