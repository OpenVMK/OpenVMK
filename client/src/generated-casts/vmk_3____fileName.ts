// vmk_3.dcr /  / fileName

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function fileName(_me: LingoMe) {
  /* global */ var t_percentLoaded = globalVar("t_percentLoaded");
  /* global */ var tErrorCode = globalVar("tErrorCode");
  if (callNamed("b64_hmac_md5", globalVar("t_percentLoaded"))) {
  callMethod("any_hmac_md5", globalVar("t_percentLoaded"))
  setGlobal("t_percentLoaded", undefined);
  }

  callNamed("md5_vm_test")
}

