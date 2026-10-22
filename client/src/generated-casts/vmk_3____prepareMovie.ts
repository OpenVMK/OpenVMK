// vmk_3.dcr /  / prepareMovie

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function prepareMovie(_me: LingoMe) {
  /* global */ var g_rInitializer = globalVar("g_rInitializer");
  /* global */ var tErrorCount = globalVar("tErrorCount");
  setThePropOf(_movie, "scriptExecutionStyle", 9);
  if (lingoBinary("eq", callNamed("externalParamValue", "sw3"), "58f5cd62-09e8-44b4-9091-116a16250498")) {
  setThePropOf(callNamed("member", "MyMovieScript"), "scriptText", "");
  setThePropOf(_player, "debugPlaybackEnabled", 0);
  } else {
  setThePropOf(_player, "debugPlaybackEnabled", 0);
  }

  setThePropOf(_player, "alertHook", callNamed("script", "MainEvents"));
  setGlobal("g_rInitializer", callNamed("new", callNamed("script", "CInit")));
  callMethod("CTOR", globalVar("g_rInitializer"))
  setGlobal("tErrorCount", 0);
}

