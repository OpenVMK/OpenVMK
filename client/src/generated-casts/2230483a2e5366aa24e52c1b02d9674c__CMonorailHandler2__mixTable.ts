// 2230483a2e5366aa24e52c1b02d9674c.cct / CMonorailHandler2 / mixTable

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function mixTable(_me: LingoMe, tKey: LingoValue) {
  /* global */ var pChars = globalVar("pChars");
  /* global */ var pCharsI = globalVar("pCharsI");
  setTheProperty("trace", 0);
  setTheProperty("traceLoad", 0);
  setThePropOf(_me, "pSBox", new LingoList([]));
  for (var i = 0; i <= 255; ++i) {
  _me.pSBox[lingoBinary("add", meProp(_me, "i"), 1)] = tKey[lingoBinary("add", lingoBinary("add", lingoBinary("mul", meProp(_me, "i"), 2), lingoBinary("mod", meProp(_me, "i"), 128)), 1)];
  }

  var tTmp = new LingoList([]);
  for (var i = 1; i <= 256; ++i) {
  tTmp[1] = callNamed("getMixTable")[meProp(_me, "i")];
  tTmp[2] = _me.pSBox[meProp(_me, "i")];
  _me.pSBox[meProp(_me, "i")] = _me.pSBox[lingoBinary("add", tTmp[1], 1)];
  _me.pSBox[lingoBinary("add", tTmp[1], 1)] = tTmp[2];
  }

  setThePropOf(_me, "i", 0);
  setThePropOf(_me, "j", 0);
}

