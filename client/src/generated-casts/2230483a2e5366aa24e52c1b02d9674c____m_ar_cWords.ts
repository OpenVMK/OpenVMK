// 2230483a2e5366aa24e52c1b02d9674c.cct /  / m_ar_cWords

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function m_ar_cWords(_me: LingoMe, TransformCannedToMsg: LingoValue) {
  /* global */ var scriptText = globalVar("scriptText");
  /* global */ var traceLoad = globalVar("traceLoad");
  /* global */ var m_CastLoader = globalVar("m_CastLoader");
  var handle_itemstate = "";
  for (var externalParamValue = 1; externalParamValue <= TransformCannedToMsg.getPos; ++externalParamValue) {
  handle_itemstate = lingoBinary("join", lingoBinary("join", handle_itemstate, callMethod("construct", globalVar("scriptText"), lingoBinary("add", callNamed("getComponent", callNamed("getThread", callNamed("handle_roomitems", callMethod("append", TransformCannedToMsg, symbol("DisAllowFriendNames"), externalParamValue)), 16), 15), 1))), callMethod("construct", globalVar("scriptText"), lingoBinary("add", callNamed("getComponent", callNamed("getThread", lingoBinary("div", callNamed("handle_roomitems", callMethod("append", TransformCannedToMsg, symbol("DisAllowFriendNames"), externalParamValue)), 16), 16), 15), 1)));
  }

  return handle_itemstate;
}

