// core.old.cct / CMgrThread / initThread

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initThread(_me: LingoMe, _this: LingoValue, tCastNumOrMemName: LingoValue, tID: LingoValue) {
  if (callNamed("stringp", tCastNumOrMemName)) {
  var tMemNum = callMethod("getmemnum", callNamed("getResourceManager"), tCastNumOrMemName);
  if (lingoBinary("eq", tMemNum, 0)) {
  return callNamed("error", _this, lingoBinary("joinPad", "Thread index field not found:", tCastNumOrMemName), symbol("initThread"));
  } else {
  var tThreadField = tCastNumOrMemName;
  var tCastNum = callNamed("member", tMemNum).castLibNum;
  }

  } else {
  if (callNamed("symbolp", tCastNumOrMemName)) {
  tThreadField = meProp(_me, "pIndexField");
  if (lingoBinary("gt", theProperty("number of castLibs"), 1)) {
  for (var i = 2; i <= theProperty("number of castLibs"); ++i) {
  if (lingoBinary("gt", callNamed("member", tThreadField, i)._number, 0)) {
  callMethod("clear", meProp(_me, "pVarMngrObj"))
  callMethod("dump", meProp(_me, "pVarMngrObj"), callNamed("member", tThreadField, i)._number)
  if (lingoBinary("eq", callNamed("symbol", callMethod("get", meProp(_me, "pVarMngrObj"), "thread.id")), tCastNumOrMemName)) {
  return callMethod("initThread", _this, i, tID);
  break;
  }

  }

  }

  }

  } else {
  if (!lingoTruthy(callNamed("integerp", tCastNumOrMemName))) {
  return callNamed("error", _this, lingoBinary("joinPad", "Cast number expected:", tCastNumOrMemName), symbol("initThread"));
  } else {
  if (lingoBinary("or", lingoBinary("lt", tCastNumOrMemName, 1), lingoBinary("gt", tCastNumOrMemName, theProperty("number of castLibs")))) {
  return callNamed("error", _this, lingoBinary("joinPad", "Cast doesn't exist:", tCastNumOrMemName), symbol("initThread"));
  }

  }

  tThreadField = meProp(_me, "pIndexField");
  tCastNum = tCastNumOrMemName;
  if (lingoBinary("lt", callNamed("member", tThreadField, tCastNum)._number, 1)) {
  return 0;
  }

  }

  }

  callMethod("clear", meProp(_me, "pVarMngrObj"))
  callMethod("dump", meProp(_me, "pVarMngrObj"), callNamed("member", tThreadField, tCastNum)._number)
  if (callNamed("symbolp", tID)) {
  var tThreadID = tID;
  } else {
  tThreadID = callNamed("symbol", callMethod("get", meProp(_me, "pVarMngrObj"), "thread.id"));
  }

  if (!lingoTruthy(callNamed("symbolp", tThreadID))) {
  return callNamed("error", _this, lingoBinary("joinPad", "Invalid thread ID:", tThreadID), symbol("initThread"));
  }

  if (callMethod("exists", _this, tThreadID)) {
  return 0;
  }

  var tThreadObj = callNamed("createObject", symbol("temp"), callNamed("GetClsVariable", "thread.instance.class"));
  callMethod("setID", tThreadObj, tThreadID)
  if (callMethod("exists", meProp(_me, "pVarMngrObj"), "thread.class")) {
  var tClass = callMethod("get", meProp(_me, "pVarMngrObj"), "thread.class");
  if (lingoBinary("eq", tClass.char[1], "[")) {
  tClass = callNamed("value", tClass);
  }

  if (!lingoTruthy(callNamed("listp", tClass))) {
  tClass = new LingoList([tClass]);
  }

  tThreadObj = callNamed("createObject", tThreadID, tThreadObj, tClass);
  }

  for (var tModule of new LingoList([symbol("interface"), symbol("component"), symbol("handler")]).toArray()) {
  var tSymbol = callNamed("symbol", lingoBinary("join", lingoBinary("join", tThreadID, "_"), tModule));
  if (callMethod("exists", meProp(_me, "pVarMngrObj"), lingoBinary("join", tModule, ".class"))) {
  tClass = callMethod("get", meProp(_me, "pVarMngrObj"), lingoBinary("join", tModule, ".class"));
  if (lingoBinary("eq", tClass.char[1], "[")) {
  tClass = callNamed("value", tClass);
  }

  if (!lingoTruthy(callNamed("listp", tClass))) {
  tClass = new LingoList([tClass]);
  }

  var tObject = callMethod("buildThreadObj", _this, tSymbol, tClass, tThreadObj);
  callMethod("setaProp", tThreadObj, tModule, tObject)
  }

  }

  meProp(_me, "pThreadList")[tThreadID] = tThreadObj;
  return 1;
}

