// core.old.cct / CMgrObject / unregisterManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function unregisterManager(_me: LingoMe, _this: LingoValue, tID: LingoValue) {
  if (!lingoTruthy(callMethod("exists", _this, tID))) {
  return callNamed("error", _this, lingoBinary("joinPad", "Referred object not found:", tID), symbol("unregisterManager"));
  }

  if (lingoBinary("neq", callMethod("getOne", meProp(_me, "pInstanceList"), tID), 0)) {
  return callNamed("error", _this, lingoBinary("joinPad", "Manager already unregistered:", tID), symbol("unregisterManager"));
  }

  callMethod("deleteOne", meProp(_me, "pManagerList"), tID)
  callMethod("append", meProp(_me, "pInstanceList"), tID)
  return 1;
}

