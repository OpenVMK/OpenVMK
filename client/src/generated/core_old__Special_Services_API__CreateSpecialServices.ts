// core.old.cct / Special Services API / CreateSpecialServices

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateSpecialServices(_me: LingoMe) {
  return callNamed("createManager", symbol("special_services"), callNamed("GetClsVariable", "special.services.class"));
}

