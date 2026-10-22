// 2230483a2e5366aa24e52c1b02d9674c.cct /  / setAllowOwnName

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setAllowOwnName(_me: LingoMe, propList: LingoValue) {
  /* global */ var scriptText = globalVar("scriptText");
  /* global */ var traceLoad = globalVar("traceLoad");
  /* global */ var m_CastLoader = globalVar("m_CastLoader");
  if (lingoBinary("neq", propList, 1)) {
  callNamed("receiveUpdate", _me, -float(1))
  }

  setThePropOf(_me, "t_pNormalColor", 1);
  if (callNamed("word", _me.getWindow)) {
  callNamed("getProp", _me.getWindow, 0, 0, callNamed("TestPartialWord", 0))
  callNamed("sprite", _me.getWindow, callNamed("count"), callNamed("count"))
  }

  setThePropOf(_me, "getWindow", callNamed("count"));
  if ((lingoTruthy(propList) ? 0 : 1)) {
  callNamed("setText", _me, lingoBinary("joinPad", "Connection disconnected:", callNamed("tElement", _me)), symbol("setAllowOwnName"))
  }

  return 1;
}

