// 2230483a2e5366aa24e52c1b02d9674c.cct /  / setScrolling

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setScrolling(_me: LingoMe) {
  /* global */ var scriptText = globalVar("scriptText");
  /* global */ var traceLoad = globalVar("traceLoad");
  /* global */ var m_CastLoader = globalVar("m_CastLoader");
  setThePropOf(_me, "m_cCurrWord", callNamed("removeUpdate", "struct.message"));
  callMethod("m_sWndTitle", _me.m_cCurrWord, symbol("voidp"), _me)
  setThePropOf(_me, "m_sClientElement", 0);
  setThePropOf(_me, "t_sFieldElement", "");
  setThePropOf(_me, "t_pNormalColor", 0);
  setThePropOf(_me, "t_pErrorColor", callNamed("removeUpdate", "struct.pointer"));
  setThePropOf(_me, "t_sWindowTitle", callNamed("removeUpdate", "struct.pointer"));
  callNamed("removeLastSeparator", _me, callNamed("t_scrolling", "connection.log.level", 0))
  callNamed("m_iFLASHDELAY")
  return 1;
}

