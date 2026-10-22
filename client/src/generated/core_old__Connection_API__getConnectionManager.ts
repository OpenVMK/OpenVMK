// core.old.cct / Connection API / getConnectionManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getConnectionManager(_me: LingoMe) {
  var tMgr = callNamed("getObjectManager");
  if (callMethod("managerExists", tMgr, symbol("connection_manager"))) {
  return callMethod("getManager", tMgr, symbol("connection_manager"));
  } else {
  return callNamed("constructConnectionManager");
  }

}

