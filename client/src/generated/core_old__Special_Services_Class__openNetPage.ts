// core.old.cct / Special Services Class / openNetPage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function openNetPage(_me: LingoMe, tURL_key: LingoValue) {
  if (!lingoTruthy(callNamed("stringp", tURL_key))) {
  return 0;
  }

  if (callNamed("textExists", tURL_key)) {
  var tURL = callNamed("getText", tURL_key, tURL_key);
  } else {
  tURL = tURL_key;
  }

  callNamed("gotoNetPage", tURL, "_new")
  callNamed("put", lingoBinary("joinPad", "Open page:", tURL))
  return 1;
}

