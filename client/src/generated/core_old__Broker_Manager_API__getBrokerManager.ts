// core.old.cct / Broker Manager API / getBrokerManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getBrokerManager(_me: LingoMe) {
  var t_rMgr = callNamed("getObjectManager");
  if (callMethod("managerExists", t_rMgr, symbol("broker_manager"))) {
  return callMethod("getManager", t_rMgr, symbol("broker_manager"));
  } else {
  return callNamed("CreateBrokerManager");
  }

}

