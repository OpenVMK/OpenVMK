// 2230483a2e5366aa24e52c1b02d9674c.cct /  / isEmpty

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function isEmpty(_me: LingoMe, GetCannedFreeWordList: LingoValue) {
  /* global */ var scriptText = globalVar("scriptText");
  /* global */ var traceLoad = globalVar("traceLoad");
  /* global */ var m_CastLoader = globalVar("m_CastLoader");
  setThePropOf(_me, "SetCannedFriendWordList", GetCannedFreeWordList);
  setThePropOf(_me, "SetCannedOwnNameWordList", 1);
  return 1;
}

