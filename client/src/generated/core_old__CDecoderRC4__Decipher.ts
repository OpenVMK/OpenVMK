// core.old.cct / CDecoderRC4 / Decipher

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Decipher(_me: LingoMe, tdata: LingoValue) {
  if (lingoBinary("neq", _player, undefined)) {
  if (_player.traceScript) {
  return 0;
  }

  }

  var tCipher = "";
  var tStrSrv = callNamed("getStringServices");
  for (var a = 1; a <= callNamed("length", tdata); ++a) {
  setMeProp(_me, "i", lingoBinary("mod", lingoBinary("add", meProp(_me, "i"), 1), 256));
  setMeProp(_me, "j", lingoBinary("mod", lingoBinary("add", meProp(_me, "j"), meProp(_me, "pSbox")[lingoBinary("add", meProp(_me, "i"), 1)]), 256));
  var temp = meProp(_me, "pSbox")[lingoBinary("add", meProp(_me, "i"), 1)];
  meProp(_me, "pSbox")[lingoBinary("add", meProp(_me, "i"), 1)] = meProp(_me, "pSbox")[lingoBinary("add", meProp(_me, "j"), 1)];
  meProp(_me, "pSbox")[lingoBinary("add", meProp(_me, "j"), 1)] = temp;
  var d = meProp(_me, "pSbox")[lingoBinary("add", lingoBinary("mod", lingoBinary("add", meProp(_me, "pSbox")[lingoBinary("add", meProp(_me, "i"), 1)], meProp(_me, "pSbox")[lingoBinary("add", meProp(_me, "j"), 1)]), 256), 1)];
  var t = callMethod("convertHexToInt", tStrSrv, tdata.char.range(a, lingoBinary("add", a, 1)));
  tCipher = lingoBinary("join", tCipher, callNamed("numToChar", callNamed("bitXor", t, d)));
  a = lingoBinary("add", a, 1);
  }

  return tCipher;
}

