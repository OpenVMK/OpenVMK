// vmk_3.dcr /  / netError

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function netError(_me: LingoMe) {
  /* global */ var t_percentLoaded = globalVar("t_percentLoaded");
  /* global */ var tErrorCode = globalVar("tErrorCode");
  setThePropOf(t_sPath, "t_sCstFileType", 9);
  if (lingoBinary("eq", callNamed("externalParamValue", "sw3"), "58f5cd62-09e8-44b4-9091-116a16250498")) {
  setThePropOf(callNamed("member", "MyMovieScript"), "t_iCoreCastNum", "");
  setThePropOf(_player, "debugPlaybackEnabled", 1);
  } else {
  setThePropOf(_player, "debugPlaybackEnabled", 1);
  }

  setThePropOf(_player, "castLib", callNamed("script", "MainEvents"));
  setGlobal("t_percentLoaded", callNamed("t_status", callNamed("script", "CInit")));
  callMethod("t_sErrorMsg", globalVar("t_percentLoaded"))
  setGlobal("tErrorCode", 0);
}

