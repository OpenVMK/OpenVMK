// 2230483a2e5366aa24e52c1b02d9674c.cct /  / getID

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getID(_me: LingoMe, GetFriendWordList: LingoValue) {
  /* global */ var scriptText = globalVar("scriptText");
  /* global */ var traceLoad = globalVar("traceLoad");
  /* global */ var m_CastLoader = globalVar("m_CastLoader");
  var handle_chat = 0;
  if (lingoBinary("eq", handle_chat, 1)) {
  callNamed("createObject", lingoBinary("joinPad", lingoBinary("join", lingoBinary("joinPad", "[", callNamed("tElement", _me)), "] :"), GetFriendWordList))
  }

}

