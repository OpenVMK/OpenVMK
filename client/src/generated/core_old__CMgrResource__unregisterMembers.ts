// core.old.cct / CMgrResource / unregisterMembers

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function unregisterMembers(_me: LingoMe, tCastNum: LingoValue) {
  if (callNamed("voidp", tCastNum)) {
  return callMethod("clearMemNumLists", _me);
  }

  var tMemberCount = thePropOf(callNamed("castLib", tCastNum), "number of castMembers");
  for (var i = 1; i <= tMemberCount; ++i) {
  var tmember = callNamed("member", i, tCastNum);
  var tTempNum = meProp(_me, "pAllMemNumList")[tmember.name];
  if (lingoBinary("neq", tTempNum, undefined)) {
  if (lingoBinary("eq", tTempNum, tmember._number)) {
  callMethod("deleteProp", meProp(_me, "pAllMemNumList"), tmember.name)
  }

  }

  if (lingoBinary("gt", callMethod("getPos", meProp(_me, "pDynMemNumList"), tmember.name), 0)) {
  callMethod("deleteAt", meProp(_me, "pDynMemNumList"), callMethod("getPos", meProp(_me, "pDynMemNumList"), tmember.name))
  }

  }

  var tAliasIndex = callNamed("getVariable", "alias.index.field");
  if (lingoBinary("gt", callNamed("member", tAliasIndex, tCastNum)._number, 0)) {
  var tAliasList = callNamed("field", tAliasIndex, tCastNum);
  for (var i = 1; i <= chunkCount(tAliasList, "line"); ++i) {
  var tLine = tAliasList.line[i];
  if (lingoBinary("gt", callNamed("length", tLine), 2)) {
  var tName = chunkOf(tLine, "item", 2, chunkCount(tLine, "item"));
  if (lingoBinary("eq", lastChunk(tName, "char"), "*")) {
  tName = tName.char.range(1, lingoBinary("sub", callNamed("length", tName), 1));
  }

  if (!lingoTruthy(callNamed("voidp", meProp(_me, "pAllMemNumList")[tName]))) {
  var tMemName = chunkOf(tLine, "item", 1, 0);
  if (!lingoTruthy(callNamed("voidp", tMemName))) {
  callMethod("deleteProp", meProp(_me, "pAllMemNumList"), tMemName)
  }

  }

  }

  }

  }

  return 1;
}

