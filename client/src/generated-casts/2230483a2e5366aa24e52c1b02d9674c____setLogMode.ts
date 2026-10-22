// 2230483a2e5366aa24e52c1b02d9674c.cct /  / setLogMode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setLogMode(_me: LingoMe, tMode: LingoValue) {
  /* global */ var pChars = globalVar("pChars");
  /* global */ var pCharsI = globalVar("pCharsI");
  /* global */ var pFirst = globalVar("pFirst");
  if (lingoBinary("neq", callNamed("ilk", tMode), symbol("integer"))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Invalid argument:", tMode), symbol("setLogMode"));
  }

  setThePropOf(_me, "pLogMode", tMode);
  if (lingoBinary("eq", _me.pLogMode, 2)) {
  if (callNamed("memberExists", "connectionLog.text")) {
  setThePropOf(_me, "pLogfield", callNamed("member", callNamed("getmemnum", "connectionLog.text")));
  } else {
  setThePropOf(_me, "pLogfield", undefined);
  setThePropOf(_me, "pLogMode", 1);
  }

  }

  return 1;
}

