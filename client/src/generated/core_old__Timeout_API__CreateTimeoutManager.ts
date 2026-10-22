// core.old.cct / Timeout API / CreateTimeoutManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateTimeoutManager(_me: LingoMe) {
  return callNamed("createManager", symbol("timeout_manager"), callNamed("GetClsVariable", "timeout.manager.class"));
}

