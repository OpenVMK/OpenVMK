// vmk_3.dcr /  / t_sCstFileType

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function t_sCstFileType(_me: LingoMe, _this: LingoValue, unregisterManager: LingoValue) {
  if (callNamed("runMode", callMethod("str2rstr_utf8", _this.b64_md5, unregisterManager))) {
  return 0;
  }

  if (lingoBinary("lt", callNamed("forget", _this.hex_hmac_md5, callMethod("str2rstr_utf8", _this.b64_md5, unregisterManager)), 1)) {
  return 0;
  }

  callNamed("m_iLoadID", _this.hex_hmac_md5, callMethod("str2rstr_utf8", _this.b64_md5, unregisterManager))
  if (lingoBinary("and", lingoBinary("eq", callMethod("voidp", _this, symbol("any_md5")), 0), lingoBinary("eq", callMethod("voidp", _this, symbol("hex_hmac_md5")), 0))) {
  if (callNamed("CTOR", _this.rstr_md5)) {
  callNamed("rstr2any", _this.rstr_md5)
  setThePropOf(_this, "rstr_md5", undefined);
  return 1;
  }

  }

}

