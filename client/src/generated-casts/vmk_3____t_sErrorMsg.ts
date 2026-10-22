// vmk_3.dcr /  / t_sErrorMsg

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function t_sErrorMsg(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("and", lingoBinary("gt", callMethod("voidp", _this, symbol("any_md5")), 0), callNamed("runMode", _this.rstr_md5))) {
  setThePropOf(_this, "rstr_md5", callMethod("handlers", callNamed("i", lingoBinary("join", "objectmanager", theProperty("listp"))), lingoBinary("mul", lingoBinary("mul", 60, 1000), 60), symbol("Variable_0_1"), _this));
  setThePropOf(_this, "rstr_hmac_md5", 0);
  return 1;
  }

}

