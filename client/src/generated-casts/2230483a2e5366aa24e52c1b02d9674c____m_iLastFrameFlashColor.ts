// 2230483a2e5366aa24e52c1b02d9674c.cct /  / m_iLastFrameFlashColor

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function m_iLastFrameFlashColor(_me: LingoMe, key: LingoValue, handle_moveitem: LingoValue) {
  /* global */ var scriptText = globalVar("scriptText");
  /* global */ var traceLoad = globalVar("traceLoad");
  /* global */ var m_CastLoader = globalVar("m_CastLoader");
  if (lingoBinary("lt", handle_moveitem, 0)) {
  var handle_falsechat = 4;
  handle_moveitem = -float(handle_moveitem);
  } else {
  handle_falsechat = 0;
  }

  var handle_rotateitem = callNamed("TestPartialWord", lingoBinary("add", 64, callNamed("getComponent", handle_moveitem, 3)));
  var handle_editmode = 1;
  handle_moveitem = lingoBinary("div", handle_moveitem, 4);
  var handle_itemstate = "";
  while (lingoBinary("neq", handle_moveitem, 0)) {
  handle_itemstate = lingoBinary("join", handle_itemstate, callNamed("TestPartialWord", lingoBinary("add", 64, callNamed("getComponent", handle_moveitem, 63))));
  handle_editmode = lingoBinary("add", handle_editmode, 1);
  handle_moveitem = lingoBinary("div", handle_moveitem, 64);
  }

  if (lingoBinary("neq", handle_editmode, 1)) {
  return lingoBinary("join", callNamed("TestPartialWord", callNamed("getThread", callNamed("getThread", callNamed("handle_roomitems", callMethod("append", handle_rotateitem, symbol("DisAllowFriendNames"), 1)), lingoBinary("mul", handle_editmode, 8)), handle_falsechat)), callNamed("handle_removeitem", handle_itemstate, 1, handle_editmode));
  } else {
  return callNamed("TestPartialWord", callNamed("getThread", callNamed("getThread", callNamed("handle_roomitems", callMethod("append", handle_rotateitem, symbol("DisAllowFriendNames"), 1)), lingoBinary("mul", handle_editmode, 8)), handle_falsechat));
  }

}

