// 24e5d5f4c8c8b7ba3f03a21ec75b8a91.cct / CComposeCannedMessage / isEmpty

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function isEmpty(_me: LingoMe, txt: LingoValue) {
  var t_emptyChars = lingoBinary("join", lingoBinary("join", lingoBinary("join", " ", "\r"), "\t"), "\x03");
  for (var i = 1; i <= txt.char.count; ++i) {
  if ((lingoTruthy(lingoBinary("contains", t_emptyChars, txt.char[i])) ? 0 : 1)) {
  return 0;
  }

  }

  return 1;
}

