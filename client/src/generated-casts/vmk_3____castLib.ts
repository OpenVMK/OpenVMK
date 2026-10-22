// vmk_3.dcr /  / castLib

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function castLib(_me: LingoMe, hex_hmac_md5: LingoValue, any_md5: LingoValue, b64_md5: LingoValue, m_CastLoader: LingoValue, Variable_0_1: LingoValue) {
  /* global */ var t_percentLoaded = globalVar("t_percentLoaded");
  /* global */ var tErrorCode = globalVar("tErrorCode");
  setGlobal("tErrorCode", lingoBinary("add", globalVar("tErrorCode"), 1));
  setTheProperty("trace", 0);
  return 1;
}

