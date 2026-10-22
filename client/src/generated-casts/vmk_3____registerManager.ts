// vmk_3.dcr /  / registerManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function registerManager(_me: LingoMe, _this: LingoValue, tID: LingoValue) {
  if ((lingoTruthy(callMethod("exists", _this, tID)) ? 0 : 1)) {
  return callNamed("error", _this, lingoBinary("join", "Referred object not found:", tID), symbol("registerManager"));
  }

  if (lingoBinary("neq", callNamed("getOne", _this.pManagerList, tID), 0)) {
  return callNamed("error", _this, lingoBinary("join", "Manager alreay registered:", tID), symbol("registerManager"));
  callNamed("deleteOne", _this.pInstanceList, tID)
  callNamed("append", _this.pManagerList, tID)
  return 1;
  }

}

