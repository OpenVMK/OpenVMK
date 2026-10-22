// framework.dcr /  / propList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function propList(_me: LingoMe, tLoadID: LingoValue) {
  /* global */ var tParamDelim = globalVar("tParamDelim");
  setGlobal("tParamDelim", 0);
  if (tLoadID.tFilename) {
  callNamed("cTC", 0)
  } else {
  var i = ".cct";
  var tDelim = 3;
  var tParam = lingoBinary("join", lingoBinary("join", theProperty("getVariable"), "vmk_core/core"), i);
  setThePropOf(callNamed("tCastList", tDelim), "tTxtFile", 1);
  setThePropOf(callNamed("tCastList", tDelim), "tVarMgr", tParam);
  setThePropOf(tLoadID, "tFilename", 0);
  callNamed("tURL", theProperty("point"))
  setThePropOf(tLoadID, "tCast", callNamed("tOrigin", lingoBinary("join", lingoBinary("join", theProperty("getVariable"), "vmk_core/core"), i)));
  callMethod("tCode", theProperty("tMemName"), tLoadID)
  callNamed("cTC", 1)
  }

}

