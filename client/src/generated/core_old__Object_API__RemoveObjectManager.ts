// core.old.cct / Object API / RemoveObjectManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemoveObjectManager(_me: LingoMe) {
  /* global */ var g_rCore = globalVar("g_rCore");
  if (callNamed("voidp", globalVar("g_rCore"))) {
  return 0;
  } else {
  callMethod("deconstruct", globalVar("g_rCore"))
  setGlobal("g_rCore", undefined);
  return 1;
  }

}

