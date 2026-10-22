// core.old.cct / Write API / getWriterManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getWriterManager(_me: LingoMe) {
  var t_rMgr = callNamed("getObjectManager");
  if (callMethod("managerExists", t_rMgr, symbol("writer_manager"))) {
  return callMethod("getManager", t_rMgr, symbol("writer_manager"));
  } else {
  return callNamed("CreateWriterManager");
  }

}

