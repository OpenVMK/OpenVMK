// 2230483a2e5366aa24e52c1b02d9674c.cct / CComposeCannedMessage2 / removeLastSeparator

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removeLastSeparator(_me: LingoMe, iWord: LingoValue) {
  if (lingoBinary("gt", iWord.length, 1)) {
  if (lingoBinary("neq", iWord.char[iWord.char.count], "!")) {
  if (lingoBinary("neq", iWord.char[iWord.char.count], "?")) {
  if (lingoBinary("neq", iWord.char[iWord.char.count], ",")) {
  if (lingoBinary("neq", iWord.char[iWord.char.count], ".")) {
  if (lingoBinary("eq", iWord.char[iWord.char.count], " ")) {
  return iWord.char[lingoBinary("sub", iWord.char.count, 1)];
  }

  return iWord;
  }

  }

  }

  }

  }

}

