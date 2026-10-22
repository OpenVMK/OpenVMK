// core.old.cct / Write API / CreateWriterManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateWriterManager(_me: LingoMe) {
  return callNamed("createManager", symbol("writer_manager"), callNamed("GetClsVariable", "writer.manager.class"));
}

