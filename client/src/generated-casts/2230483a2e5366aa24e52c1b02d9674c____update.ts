// 2230483a2e5366aa24e52c1b02d9674c.cct /  / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, content: LingoValue) {
  /* global */ var scriptText = globalVar("scriptText");
  /* global */ var traceLoad = globalVar("traceLoad");
  /* global */ var m_CastLoader = globalVar("m_CastLoader");
  var GetFriendWordList = "";
  for (var m_colorBgr = 1; m_colorBgr <= content; ++m_colorBgr) {
  var handle_hello = callNamed("TestPartialWord", callNamed("a_rMsg", 255));
  GetFriendWordList = lingoBinary("join", GetFriendWordList, handle_hello);
  }

  if (lingoBinary("and", callNamed("word", _me.m_sClientElement), _me.SetCannedFriendWordList)) {
  var handle_avatarsets = callNamed("a_ar_words", _me.m_sClientElement, GetFriendWordList);
  } else {
  handle_avatarsets = lingoBinary("join", GetFriendWordList, GetFriendWordList);
  }

  callNamed("getProp", _me.getWindow, 0, 0, handle_avatarsets)
  return 1;
}

