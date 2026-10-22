// core.old.cct / CMgrCastload / startCastLoad

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function startCastLoad(_me: LingoMe, _this: LingoValue, tCasts: LingoValue, tPermanentFlag: LingoValue, tAdd: LingoValue) {
  if (callNamed("voidp", tPermanentFlag)) {
  tPermanentFlag = 0;
  }

  setMeProp(_me, "pTempWaitList", new LingoList([]));
  var tCastList = new LingoList([]);
  switch (callNamed("ilk", tCasts)) {
case symbol("propList"):
  for (var f = 1; f <= tCasts.count; ++f) {
  var tPermanentLevel = callMethod("getPropAt", tCasts, f);
  var tCastName = tCasts[f];
  callMethod("add", tCastList, tCastName)
  callMethod("addOneCastToWaitList", _this, tCastName, tPermanentLevel)
  }

  break;
case symbol("list"):
  for (var tCastName of tCasts.toArray()) {
  callMethod("add", tCastList, tCastName)
  callMethod("addOneCastToWaitList", _this, tCastName, tPermanentFlag)
  }

  break;
  default:
  tCasts = callNamed("list", tCasts);
  for (var tCastName of tCasts.toArray()) {
  callMethod("add", tCastList, tCastName)
  callMethod("addOneCastToWaitList", _this, tCastName, tPermanentFlag)
  }

  }

  if (lingoBinary("eq", callNamed("count", tCasts), 0)) {
  return 0;
  }

  if (callNamed("voidp", tAdd)) {
  tAdd = 0;
  }

  var tID = callNamed("getUniqueID");
  setMeProp(_me, "pLatestTaskID", tID);
  if (lingoBinary("eq", tAdd, 0)) {
  callMethod("removeTemporaryCast", _this, tCastList)
  }

  if (lingoBinary("gt", meProp(_me, "pTempWaitList").count, 0)) {
  meProp(_me, "pWaitList")[tID] = callMethod("duplicate", meProp(_me, "pTempWaitList"));
  }

  if (lingoBinary("eq", meProp(_me, "pWaitList").count, 0)) {
  var tStatus = symbol("ready");
  var tPercent = float(1);
  } else {
  tStatus = symbol("LOADING");
  tPercent = 0;
  }

  meProp(_me, "pTaskList")[tID] = callNamed("createObject", symbol("temp"), callNamed("GetClsVariable", "castload.task.class"));
  var tProps = new LingoPropList([]);
  tProps[symbol("id")] = tID;
  tProps[symbol("status")] = tStatus;
  tProps[symbol("Percent")] = tPercent;
  tProps[symbol("sofar")] = 0;
  tProps[symbol("casts")] = callMethod("duplicate", meProp(_me, "pTempWaitList"));
  tProps[symbol("callback")] = undefined;
  callMethod("Define", meProp(_me, "pTaskList")[tID], tProps)
  for (var i = 1; i <= callNamed("getIntVariable", "net.operation.count", 2); ++i) {
  callMethod("AddNextpreloadNetThing", _this)
  }

  return tID;
}

