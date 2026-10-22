// core.old.cct / Timeout API / getTimeoutManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getTimeoutManager(_me: LingoMe) {
  var t_rMgr = callNamed("getObjectManager");
  if (callMethod("managerExists", t_rMgr, symbol("timeout_manager"))) {
  return callMethod("getManager", t_rMgr, symbol("timeout_manager"));
  } else {
  return callNamed("CreateTimeoutManager");
  }

}

