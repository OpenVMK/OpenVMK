// core.old.cct / CMgrCastload / resetCastLibs

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function resetCastLibs(_me: LingoMe, _this: LingoValue, tClean: LingoValue, tForced: LingoValue) {
  if (lingoBinary("neq", tClean, 1)) {
  tClean = 0;
  }

  var tTempList = new LingoList([]);
  if (lingoBinary("and", lingoBinary("eq", theProperty("runMode"), "Author"), lingoBinary("neq", tForced, 1))) {
  var f = 1;
  while (1) {
  if (callNamed("variableExists", lingoBinary("join", "cast.dev.", f))) {
  callMethod("add", tTempList, callNamed("getVariable", lingoBinary("join", "cast.dev.", f)))
  } else {
  break;
  }

  f = lingoBinary("add", f, 1);
  }

  }

  setMeProp(_me, "pCastLibCount", theProperty("number of castLibs"));
  var tEmptyCastNum = 1;
  for (var tCastNum = 2; tCastNum <= meProp(_me, "pCastLibCount"); ++tCastNum) {
  if (lingoBinary("and", lingoBinary("neq", tCastNum, meProp(_me, "pSysCastNum")), lingoBinary("neq", tCastNum, meProp(_me, "pBinCastNum")))) {
  var tCastName = callNamed("castLib", tCastNum).name;
  if (lingoBinary("eq", callMethod("findPos", tTempList, tCastName), 0)) {
  if (tClean) {
  callMethod("closeThread", callNamed("getThreadManager"), tCastNum)
  }

  if (tClean) {
  callMethod("unregisterMembers", callNamed("getResourceManager"), tCastNum)
  }

  setThePropOf(callNamed("castLib", tCastNum), "name", lingoBinary("joinPad", meProp(_me, "pNullCastName"), tEmptyCastNum));
  setThePropOf(callNamed("castLib", tCastNum), "fileName", lingoBinary("join", lingoBinary("join", theProperty("moviePath"), meProp(_me, "pNullCastName")), meProp(_me, "pFileExtension")));
  tEmptyCastNum = lingoBinary("add", tEmptyCastNum, 1);
  continue;
  }

  meProp(_me, "pLoadedCasts")[tCastName] = callNamed("string", tCastNum);
  }

  }

  return callMethod("InitPreloader", _this);
}

