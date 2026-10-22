// 0e4feeca6184e908b7fbd03d6d41b7b8.cct / Multiuser API / getMultiuserManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getMultiuserManager(_me: LingoMe) {
  var tMgr = callNamed("getObjectManager");
  if ((lingoTruthy(callMethod("managerExists", tMgr, symbol("multiuser_manager"))) ? 0 : 1)) {
  return callNamed("constructMultiuserManager");
  }

  return callMethod("getManager", tMgr, symbol("multiuser_manager"));
}

