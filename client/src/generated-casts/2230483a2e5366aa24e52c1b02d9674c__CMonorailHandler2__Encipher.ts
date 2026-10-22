// 2230483a2e5366aa24e52c1b02d9674c.cct / CMonorailHandler2 / Encipher

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Encipher(_me: LingoMe, tdata: LingoValue, tMode: LingoValue) {
  /* global */ var pChars = globalVar("pChars");
  /* global */ var pCharsI = globalVar("pCharsI");
  setTheProperty("trace", 0);
  setTheProperty("traceLoad", 0);
  var tCipher = "";
  var tBytes = new LingoList([]);
  for (var e = 1; e <= callNamed("length", tdata); ++e) {
  var a = callNamed("charToNum", tdata.char[e]);
  if (lingoBinary("gt", a, 255)) {
  callNamed("add", tBytes, lingoBinary("mod", a, 256))
  }

  callNamed("add", tBytes, a)
  }

  for (var a = 1; a <= tBytes.count; ++a) {
  setThePropOf(_me, "i", lingoBinary("mod", lingoBinary("add", _me.i, 1), 256));
  setThePropOf(_me, "j", lingoBinary("mod", lingoBinary("add", _me.j, _me.pSBox[lingoBinary("add", _me.i, 1)]), 256));
  var temp = _me.pSBox[lingoBinary("add", _me.i, 1)];
  _me.pSBox[lingoBinary("add", _me.i, 1)] = _me.pSBox[lingoBinary("add", _me.j, 1)];
  _me.pSBox[lingoBinary("add", _me.j, 1)] = temp;
  var d = _me.pSBox[lingoBinary("add", lingoBinary("mod", lingoBinary("add", _me.pSBox[lingoBinary("add", _me.i, 1)], _me.pSBox[lingoBinary("add", _me.j, 1)]), 256), 1)];
  tCipher = lingoBinary("join", tCipher, callMethod("sanitize", _me, callNamed("numToChar", callNamed("bitXor", tBytes[a], d))));
  }

  return tCipher;
}

