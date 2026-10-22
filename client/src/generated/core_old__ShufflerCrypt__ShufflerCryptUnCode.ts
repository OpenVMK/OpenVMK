// core.old.cct / ShufflerCrypt / ShufflerCryptUnCode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShufflerCryptUnCode(_me: LingoMe, a_sMemberIn: LingoValue, a_sMemberOut: LingoValue, a_sShuffler: LingoValue, a_sOrigin: LingoValue) {
  var tTime = theProperty("milliSeconds");
  var tInText = callNamed("member", a_sMemberIn).text;
  var tOutText = "";
  var tMap = new LingoList([]);
  if (lingoBinary("neq", a_sShuffler.length, a_sOrigin.length)) {
  callNamed("put", "Error, shuffler & origin different length")
  return 0;
  }

  var t_mp_ofs = new LingoPropList([]);
  for (var i = 1; i <= a_sShuffler.length; ++i) {
  callMethod("setaProp", t_mp_ofs, a_sShuffler.char[i], i)
  }

  callMethod("sort", t_mp_ofs)
  var tI = 0;
  for (var tL = 1; tL <= tInText.line.count; ++tL) {
  var tLine = tInText.line[tL];
  var tOutLine = "";
  for (var t = 1; t <= tLine.char.count; ++t) {
  var tChar = tLine.char[t];
  var tOfs = lingoBinary("sub", callNamed("getaProp", t_mp_ofs, tChar), 1);
  if (lingoBinary("neq", tOfs, -float(1))) {
  tOfs = lingoBinary("add", lingoBinary("mod", lingoBinary("sub", tOfs, tI), a_sShuffler.length), 1);
  if (lingoBinary("lt", tOfs, 1)) {
  tOfs = lingoBinary("add", tOfs, a_sShuffler.length);
  }

  tChar = a_sOrigin.char[tOfs];
  tI = lingoBinary("add", tI, 1);
  }

  tOutLine = tOutLine + tChar;
  }

  tOutText = tOutText + lingoBinary("join", tOutLine, "\r");
  }

  setThePropOf(callNamed("member", a_sMemberOut), "text", tOutText);
  callNamed("put", lingoBinary("join", lingoBinary("join", "Decoding Encrypted texts took ", lingoBinary("sub", theProperty("milliSeconds"), tTime)), " ms"))
}

