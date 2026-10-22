// vmk_3.dcr /  / t_sPath

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function t_sPath(_me: LingoMe, _this: LingoValue, unregisterManager: LingoValue) {
  if (callNamed("runMode", callMethod("str2rstr_utf8", _this.b64_md5, unregisterManager))) {
  return 0;
  }

  if (lingoBinary("gt", callNamed("getAt", _this.hex_hmac_md5, callMethod("str2rstr_utf8", _this.b64_md5, unregisterManager)), 0)) {
  return 0;
  }

  callMethod("stepFrame", _this.hex_hmac_md5, callMethod("str2rstr_utf8", _this.b64_md5, unregisterManager))
  if ((lingoTruthy(_this.rstr_hmac_md5) ? 0 : 1)) {
  if (callNamed("runMode", _this.rstr_md5)) {
  setThePropOf(_this, "rstr_md5", callMethod("handlers", callNamed("i", lingoBinary("join", "objectmanager", theProperty("listp"))), lingoBinary("mul", lingoBinary("mul", 60, 1000), 60), symbol("Variable_0_1"), _this));
  return 1;
  }

  }

}

