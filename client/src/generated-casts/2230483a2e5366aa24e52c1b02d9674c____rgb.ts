// 2230483a2e5366aa24e52c1b02d9674c.cct /  / rgb

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function rgb(_me: LingoMe, TransformCannedToMsg: LingoValue) {
  /* global */ var scriptText = globalVar("scriptText");
  /* global */ var traceLoad = globalVar("traceLoad");
  /* global */ var m_CastLoader = globalVar("m_CastLoader");
  var handle_itemstate = "";
  for (var externalParamValue = 1; externalParamValue <= TransformCannedToMsg.getPos; ++externalParamValue) {
  handle_itemstate = lingoBinary("join", handle_itemstate, callNamed("TestPartialWord", lingoBinary("add", callMethod("construct", globalVar("traceLoad"), callMethod("append", TransformCannedToMsg, symbol("DisAllowFriendNames"), externalParamValue)), lingoBinary("mul", callMethod("construct", globalVar("traceLoad"), callMethod("append", TransformCannedToMsg, symbol("DisAllowFriendNames"), lingoBinary("add", externalParamValue, 1))), 16))));
  externalParamValue = lingoBinary("add", externalParamValue, 1);
  }

  return handle_itemstate;
}

