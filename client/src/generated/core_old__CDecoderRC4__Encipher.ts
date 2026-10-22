// core.old.cct / CDecoderRC4 / Encipher

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Encipher(_me: LingoMe, tdata: LingoValue) {
  if (lingoBinary("neq", _player, undefined)) {
  if (_player.traceScript) {
  return 0;
  }

  }

  var tCipher = "";
  var tBytes = new LingoList([]);
  for (var e = 1; e <= callNamed("length", tdata); ++e) {
  var a = callNamed("charToNum", chunkOf(tdata, "char", e, 0));
  if (lingoBinary("gt", a, 255)) {
  callNamed("add", tBytes, lingoBinary("div", lingoBinary("sub", a, lingoBinary("mod", a, 256)), 256))
  callNamed("add", tBytes, lingoBinary("mod", a, 256))
  continue;
  }

  callNamed("add", tBytes, a)
  }

  var tStrSrv = callNamed("getStringServices");
  for (var a = 1; a <= tBytes.count; ++a) {
  setMeProp(_me, "i", lingoBinary("mod", lingoBinary("add", meProp(_me, "i"), 1), 256));
  setMeProp(_me, "j", lingoBinary("mod", lingoBinary("add", meProp(_me, "j"), meProp(_me, "pSbox")[lingoBinary("add", meProp(_me, "i"), 1)]), 256));
  var temp = meProp(_me, "pSbox")[lingoBinary("add", meProp(_me, "i"), 1)];
  meProp(_me, "pSbox")[lingoBinary("add", meProp(_me, "i"), 1)] = meProp(_me, "pSbox")[lingoBinary("add", meProp(_me, "j"), 1)];
  meProp(_me, "pSbox")[lingoBinary("add", meProp(_me, "j"), 1)] = temp;
  var d = meProp(_me, "pSbox")[lingoBinary("add", lingoBinary("mod", lingoBinary("add", meProp(_me, "pSbox")[lingoBinary("add", meProp(_me, "i"), 1)], meProp(_me, "pSbox")[lingoBinary("add", meProp(_me, "j"), 1)]), 256), 1)];
  tCipher = lingoBinary("join", tCipher, callMethod("convertIntToHex", tStrSrv, callNamed("bitXor", tBytes[a], d)));
  }

  return tCipher;
}

