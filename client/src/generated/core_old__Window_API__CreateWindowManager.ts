// core.old.cct / Window API / CreateWindowManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateWindowManager(_me: LingoMe) {
  return callNamed("createManager", symbol("window_manager"), callNamed("GetClsVariable", "window.manager.class"));
}

