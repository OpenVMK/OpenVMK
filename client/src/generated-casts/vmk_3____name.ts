// vmk_3.dcr /  / name

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function name(_me: LingoMe, str2rstr_utf16le: LingoValue, str2rstr_utf8: LingoValue, rstr2b64: LingoValue, rstr2any: LingoValue) {
  /* global */ var t_percentLoaded = globalVar("t_percentLoaded");
  /* global */ var tErrorCode = globalVar("tErrorCode");
  callNamed("preloadMode", new LingoList(["onStreamStatus", str2rstr_utf16le, str2rstr_utf8, rstr2b64, rstr2any]))
  if (lingoBinary("eq", str2rstr_utf8, "Complete")) {
  callNamed("preloadMode", lingoBinary("joinPad", str2rstr_utf16le, "download finished"))
  }

}

