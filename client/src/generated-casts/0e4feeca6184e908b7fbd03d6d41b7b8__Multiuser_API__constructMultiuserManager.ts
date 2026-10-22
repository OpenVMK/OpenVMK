// 0e4feeca6184e908b7fbd03d6d41b7b8.cct / Multiuser API / constructMultiuserManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function constructMultiuserManager(_me: LingoMe) {
  return callNamed("createManager", symbol("multiuser_manager"), callNamed("getClassVariable", "multiuser.manager.class"));
}

