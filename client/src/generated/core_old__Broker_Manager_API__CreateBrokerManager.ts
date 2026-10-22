// core.old.cct / Broker Manager API / CreateBrokerManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateBrokerManager(_me: LingoMe) {
  return callNamed("createManager", symbol("broker_manager"), callNamed("GetClsVariable", "broker.manager.class"));
}

