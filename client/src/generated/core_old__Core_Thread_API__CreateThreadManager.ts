// core.old.cct / Core Thread API / CreateThreadManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateThreadManager(_me: LingoMe) {
  return callNamed("createManager", symbol("thread_manager"), callNamed("GetClsVariable", "thread.manager.class"));
}

