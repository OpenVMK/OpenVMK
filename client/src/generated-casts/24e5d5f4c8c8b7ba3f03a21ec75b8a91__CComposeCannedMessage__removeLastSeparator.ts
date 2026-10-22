// 24e5d5f4c8c8b7ba3f03a21ec75b8a91.cct / CComposeCannedMessage / removeLastSeparator

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
  switch (iWord.char[iWord.char.count]) {
case "!":
case "?":
case ",":
case ".":
case " ":
  return iWord.char[lingoBinary("sub", iWord.char.count, 1)];
  break;
  break;
  break;
  break;
  }

  }

  return iWord;
}

