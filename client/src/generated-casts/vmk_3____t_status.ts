// vmk_3.dcr /  / t_status

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function t_status(_me: LingoMe, _this: LingoValue) {
  if (callNamed("CTOR", _this.rstr_md5)) {
  callNamed("rstr2any", _this.rstr_md5)
  }

  setThePropOf(_this, "rstr_md5", undefined);
  setThePropOf(_this, "rstr_hmac_md5", 1);
  return 1;
}

