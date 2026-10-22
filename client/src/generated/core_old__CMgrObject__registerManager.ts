// core.old.cct / CMgrObject / registerManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function registerManager(_me: LingoMe, _this: LingoValue, tID: LingoValue) {
  if (!lingoTruthy(callMethod("exists", _this, tID))) {
  return callNamed("error", _this, lingoBinary("joinPad", "Referred object not found:", tID), symbol("registerManager"));
  }

  if (lingoBinary("neq", callMethod("getOne", meProp(_me, "pManagerList"), tID), 0)) {
  return callNamed("error", _this, lingoBinary("joinPad", "Manager alreay registered:", tID), symbol("registerManager"));
  }

  callMethod("deleteOne", meProp(_me, "pInstanceList"), tID)
  callMethod("append", meProp(_me, "pManagerList"), tID)
  return 1;
}

