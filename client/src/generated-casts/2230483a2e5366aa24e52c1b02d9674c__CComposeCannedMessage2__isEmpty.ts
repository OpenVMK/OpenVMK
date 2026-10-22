// 2230483a2e5366aa24e52c1b02d9674c.cct / CComposeCannedMessage2 / isEmpty

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function isEmpty(_me: LingoMe, txt: LingoValue) {
  var t_emptyChars = lingoBinary("join", lingoBinary("join", lingoBinary("join", " ", "[[RETURN]]"), "    "), "\x03");
  for (var i = 1; i <= txt.char.count; ++i) {
  if (lingoBinary("contains", (lingoTruthy(t_emptyChars) ? 0 : 1), txt.char[i])) {
  return 0;
  }

  }

  return 1;
}

