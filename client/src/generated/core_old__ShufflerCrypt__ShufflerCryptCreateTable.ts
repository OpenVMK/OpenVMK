// core.old.cct / ShufflerCrypt / ShufflerCryptCreateTable

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShufflerCryptCreateTable(_me: LingoMe, a_sOrigin: LingoValue, a_sKey: LingoValue) {
  var t_sShuffler = a_sOrigin;
  var tKey = a_sKey;
  while (lingoBinary("lt", tKey.length, a_sOrigin.length)) {
  tKey = lingoBinary("join", tKey, tKey);
  }

  tKey = callNamed("chars", tKey, 1, a_sOrigin.length);
  for (var i = 1; i <= tKey.length; ++i) {
  var tSrc = callNamed("chars", tKey, i, i);
  var tOfs = callNamed("offsetCaseSensitive", tSrc, t_sShuffler);
  if (!lingoTruthy(callNamed("voidp", tOfs))) {
  var tCharDst = callNamed("chars", t_sShuffler, i, i);
  var tCharSrc = callNamed("chars", t_sShuffler, tOfs, tOfs);
  if (lingoBinary("lt", i, tOfs)) {
  var tNewString = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", callNamed("chars", t_sShuffler, 1, lingoBinary("sub", i, 1)), tCharSrc), callNamed("chars", t_sShuffler, lingoBinary("add", i, 1), lingoBinary("sub", tOfs, 1))), tCharDst), callNamed("chars", t_sShuffler, lingoBinary("add", tOfs, 1), t_sShuffler.length));
  } else {
  if (lingoBinary("gt", i, tOfs)) {
  tNewString = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", callNamed("chars", t_sShuffler, 1, lingoBinary("sub", tOfs, 1)), tCharDst), callNamed("chars", t_sShuffler, lingoBinary("add", tOfs, 1), lingoBinary("sub", i, 1))), tCharSrc), callNamed("chars", t_sShuffler, lingoBinary("add", i, 1), t_sShuffler.length));
  } else {
  tNewString = t_sShuffler;
  }

  }

  t_sShuffler = tNewString;
  continue;
  }

  callNamed("put", "Error fuck! Char not found in shuffler string")
  return;
  }

  return t_sShuffler;
}

