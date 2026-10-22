// core.old.cct / Object API / registerObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function registerObject(_me: LingoMe, a_sID: LingoValue, a_rObject: LingoValue) {
  /* global */ var g_rCore = globalVar("g_rCore");
  return callMethod("registerObject", callNamed("getObjectManager"), a_sID, a_rObject);
}

