// core.old.cct / String Services API / CreateStringServices

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateStringServices(_me: LingoMe) {
  return callNamed("createManager", symbol("string_services"), callNamed("GetClsVariable", "string.services.class"));
}

