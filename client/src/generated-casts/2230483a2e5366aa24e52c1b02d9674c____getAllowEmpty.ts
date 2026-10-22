// 2230483a2e5366aa24e52c1b02d9674c.cct /  / getAllowEmpty

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getAllowEmpty(_me: LingoMe, deleteOne: LingoValue) {
  /* global */ var scriptText = globalVar("scriptText");
  /* global */ var traceLoad = globalVar("traceLoad");
  /* global */ var m_CastLoader = globalVar("m_CastLoader");
  var t_allowFriendNames = "";
  for (var m_colorBgr = 1; m_colorBgr <= deleteOne.i_bValue; ++m_colorBgr) {
  t_allowFriendNames = lingoBinary("join", lingoBinary("join", t_allowFriendNames, callMethod("construct", deleteOne, m_colorBgr)), ".");
  }

  return callMethod("append", t_allowFriendNames, symbol("DisAllowFriendNames"), 1, lingoBinary("sub", t_allowFriendNames.getPos, 1));
}

