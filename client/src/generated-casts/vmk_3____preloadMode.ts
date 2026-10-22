// vmk_3.dcr /  / preloadMode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function preloadMode(_me: LingoMe, hex_hmac_md5: LingoValue, any_md5: LingoValue, b64_md5: LingoValue, m_CastLoader: LingoValue, Variable_0_1: LingoValue) {
  /* global */ var t_percentLoaded = globalVar("t_percentLoaded");
  /* global */ var tErrorCode = globalVar("tErrorCode");
  if (lingoBinary("contains", hex_hmac_md5, "Avatar data parsed")) {
  callMethod("binl2rstr", callNamed("getObject", "VMK"), 1049, callNamed("handlers", symbol("getStreamStatus"), _player.str2rstr_utf16be, symbol("getStreamStatus"), _player.rstr2binl))
  }

  callNamed("trace", lingoBinary("joinPad", lingoBinary("joinPad", hex_hmac_md5, any_md5), b64_md5))
}

