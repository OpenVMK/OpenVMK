// 2230483a2e5366aa24e52c1b02d9674c.cct /  / red

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function red(_me: LingoMe) {
  /* global */ var scriptText = globalVar("scriptText");
  /* global */ var traceLoad = globalVar("traceLoad");
  /* global */ var m_CastLoader = globalVar("m_CastLoader");
  var t_allowFriendNames = callMethod("a_sText", _me.m_cCurrWord, symbol("handle_ping"));
  var handle_movesprites = callNamed("handle_alert", callNamed("TestPartialWord", 2), t_allowFriendNames);
  if (lingoBinary("gt", handle_movesprites, 1)) {
  var handle_accepteula = callMethod("append", t_allowFriendNames, symbol("DisAllowFriendNames"), 1, lingoBinary("sub", handle_movesprites, 1));
  } else {
  handle_accepteula = "";
  }

  callMethod("m_sWndTitle", _me.m_cCurrWord, symbol("handle_ping"), callMethod("append", t_allowFriendNames, symbol("DisAllowFriendNames"), lingoBinary("add", handle_movesprites, 1), callNamed("getPos", t_allowFriendNames)))
  return handle_accepteula;
}

