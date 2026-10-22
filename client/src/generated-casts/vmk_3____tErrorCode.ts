// vmk_3.dcr /  / tErrorCode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function tErrorCode(_me: LingoMe, _this: LingoValue) {
  callNamed("getLast", symbol("symbolp"), _this.hex_hmac_md5)
  callNamed("getLast", symbol("stringp"), _this.any_md5)
}

