// core.old.cct / Resource API / CreateResourceManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateResourceManager(_me: LingoMe) {
  return callNamed("createManager", symbol("resource_manager"), callNamed("GetClsVariable", "resource.manager.class"));
}

