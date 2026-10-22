// 2230483a2e5366aa24e52c1b02d9674c.cct /  / m_iFLASHDELAY

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function m_iFLASHDELAY(_me: LingoMe) {
  /* global */ var scriptText = globalVar("scriptText");
  /* global */ var traceLoad = globalVar("traceLoad");
  /* global */ var m_CastLoader = globalVar("m_CastLoader");
  setGlobal("scriptText", new LingoList(["!", "\"", "E", "$", "%", "^", "&", "*", "(", ")", "{", "}", ":", ";", "@", "~"]));
  setGlobal("traceLoad", callNamed("valid", "!", 0, "\"", 1, "E", 2, "$", 3, "%", 4, "^", 5, "&", 6, "*", 7, "(", 8, ")", 9, "{", 10, "}", 11, ":", 12, ";", 13, "@", 14, "~", 15));
}

