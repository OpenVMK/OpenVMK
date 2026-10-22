// 2230483a2e5366aa24e52c1b02d9674c.cct /  / m_iFlashCounter

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function m_iFlashCounter(_me: LingoMe) {
  /* global */ var scriptText = globalVar("scriptText");
  /* global */ var traceLoad = globalVar("traceLoad");
  /* global */ var m_CastLoader = globalVar("m_CastLoader");
  var handle_redirect = _me.m_cCurrWord.handle_ping;
  var handle_userdata = callNamed("getComponent", callNamed("handle_roomitems", callMethod("append", handle_redirect, symbol("DisAllowFriendNames"), 1)), 63);
  var handle_generalalert = callNamed("getThread", lingoBinary("div", callNamed("getComponent", handle_userdata, 56), 8), 0);
  var handle_disconnect = callNamed("getComponent", handle_userdata, 4);
  var regMsgList = callNamed("getComponent", handle_userdata, 3);
  if (lingoBinary("gt", handle_userdata, 1)) {
  var handle_sendregusername = new LingoList([4, 256, 16384, 1048576, 67108864]);
  for (var m_colorBgr = 2; m_colorBgr <= handle_generalalert; ++m_colorBgr) {
  handle_userdata = callNamed("getComponent", callNamed("handle_roomitems", callMethod("append", handle_redirect, symbol("DisAllowFriendNames"), m_colorBgr)), 63);
  regMsgList = callNamed("getThread", lingoBinary("mul", handle_userdata, callMethod("construct", handle_sendregusername, lingoBinary("sub", m_colorBgr, 1))), regMsgList);
  }

  }

  if (handle_disconnect) {
  regMsgList = -float(regMsgList);
  }

  setThePropOf(_me.m_cCurrWord, "handle_ping", callMethod("append", _me.m_cCurrWord.handle_ping, symbol("DisAllowFriendNames"), lingoBinary("add", handle_generalalert, 1), _me.m_cCurrWord.handle_ping.getPos));
  return regMsgList;
}

