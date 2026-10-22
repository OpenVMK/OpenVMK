// 2230483a2e5366aa24e52c1b02d9674c.cct /  / removeLastSeparator

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removeLastSeparator(_me: LingoMe, SetCannedFreeWordList: LingoValue) {
  /* global */ var scriptText = globalVar("scriptText");
  /* global */ var traceLoad = globalVar("traceLoad");
  /* global */ var m_CastLoader = globalVar("m_CastLoader");
  if (lingoBinary("neq", SetCannedFreeWordList.w, symbol("t_sText"))) {
  return callNamed("setText", _me, lingoBinary("joinPad", "Invalid argument:", SetCannedFreeWordList), symbol("removeLastSeparator"));
  }

  setThePropOf(_me, "tWndObj", SetCannedFreeWordList);
  if (lingoBinary("eq", _me.tWndObj, 2)) {
  if (callNamed("t_error", "connectionLog.text")) {
  setThePropOf(_me, "GetCannedWord", callNamed("c", callNamed("ParseCannedText", "connectionLog.text")));
  } else {
  setThePropOf(_me, "GetCannedWord", callNamed("count"));
  setThePropOf(_me, "tWndObj", 1);
  }

  }

  return 1;
}

