// core.old.cct / CWindowScrollbar / initEventAgent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initEventAgent(_me: LingoMe, tBoolean: LingoValue) {
  var tAgent = callNamed("getObject", meProp(_me, "pAgentID"));
  if (tBoolean) {
  callMethod("registerEvent", tAgent, _me, symbol("mouseUp"), symbol("mouseUp"))
  callMethod("registerEvent", tAgent, _me, symbol("mouseWithin"), symbol("mouseWithin"))
  } else {
  callMethod("unregisterEvent", tAgent, symbol("mouseUp"))
  callMethod("unregisterEvent", tAgent, symbol("mouseWithin"))
  }

}

