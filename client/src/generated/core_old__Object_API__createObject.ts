// core.old.cct / Object API / createObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createObject(_me: LingoMe, a_sID: LingoValue) {
  /* global */ var g_rCore = globalVar("g_rCore");
  var t_ar_vClass = new LingoList([]);
  for (var i = 2; i <= theProperty("paramCount"); ++i) {
  var t_vParam = callNamed("param", i);
  if (callNamed("listp", t_vParam)) {
  for (var t_vClass of t_vParam.toArray()) {
  callMethod("add", t_ar_vClass, t_vClass)
  }

  continue;
  }

  callMethod("add", t_ar_vClass, t_vParam)
  }

  return callMethod("create", callNamed("getObjectManager"), a_sID, t_ar_vClass);
}

