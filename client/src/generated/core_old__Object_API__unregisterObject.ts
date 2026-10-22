// core.old.cct / Object API / unregisterObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function unregisterObject(_me: LingoMe, a_sID: LingoValue) {
  /* global */ var g_rCore = globalVar("g_rCore");
  return callMethod("unregisterObject", callNamed("getObjectManager"), a_sID);
}

