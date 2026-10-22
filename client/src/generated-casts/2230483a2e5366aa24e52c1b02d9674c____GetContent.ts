// 2230483a2e5366aa24e52c1b02d9674c.cct /  / GetContent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetContent(_me: LingoMe, ch: LingoValue) {
  /* global */ var scriptText = globalVar("scriptText");
  /* global */ var traceLoad = globalVar("traceLoad");
  /* global */ var m_CastLoader = globalVar("m_CastLoader");
  if ((lingoTruthy(callNamed("word", ch)) ? 0 : 1)) {
  return callNamed("setText", _me, lingoBinary("joinPad", "Decoder object expected:", ch), symbol("GetContent"));
  } else {
  setThePropOf(_me, "m_sClientElement", ch);
  }

  return 1;
}

