// core.old.cct / Text API / CreateTextManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateTextManager(_me: LingoMe) {
  return callNamed("createManager", symbol("text_manager"), callNamed("GetClsVariable", "text.manager.class"));
}

