// vmk_3.dcr /  / getPropRef

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getPropRef(_me: LingoMe, rstr2hex: LingoValue) {
  /* global */ var t_percentLoaded = globalVar("t_percentLoaded");
  /* global */ var tErrorCode = globalVar("tErrorCode");
  if (callNamed("voidp", rstr2hex)) {
  callNamed("rstr_hmac_md5", theProperty("rstr_md5"))
  }

  setThePropOf(_player, "castLib", callNamed("script", "MainEvents"));
}

