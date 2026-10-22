// vmk_3.dcr /  / unregisterManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function unregisterManager(_me: LingoMe, _this: LingoValue, tID: LingoValue) {
  if ((lingoTruthy(callMethod("exists", _this, tID)) ? 0 : 1)) {
  return callNamed("error", _this, lingoBinary("join", "Referred object not found:", tID), symbol("unregisterManager"));
  }

  if (lingoBinary("neq", callNamed("getOne", _this.pInstanceList, tID), 0)) {
  return callNamed("error", _this, lingoBinary("join", "Manager already unregistered:", tID), symbol("unregisterManager"));
  callNamed("deleteOne", _this.pManagerList, tID)
  callNamed("append", _this.pInstanceList, tID)
  return 1;
  }

}

