// core.old.cct / CMgrThread / closeThread

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function closeThread(_me: LingoMe, _this: LingoValue, tCastNumOrID: LingoValue) {
  callMethod("clear", meProp(_me, "pVarMngrObj"))
  if (callNamed("integerp", tCastNumOrID)) {
  if (lingoBinary("gt", callNamed("member", meProp(_me, "pIndexField"), tCastNumOrID)._number, 0)) {
  callMethod("dump", meProp(_me, "pVarMngrObj"), callNamed("member", meProp(_me, "pIndexField"), tCastNumOrID)._number)
  var tID = callNamed("symbol", callMethod("get", meProp(_me, "pVarMngrObj"), "thread.id"));
  } else {
  return 0;
  }

  } else {
  if (callNamed("symbolp", tCastNumOrID)) {
  tID = tCastNumOrID;
  } else {
  return callNamed("error", _this, lingoBinary("joinPad", "Invalid argument:", tCastNumOrID), symbol("closeThread"));
  }

  }

  var tThread = meProp(_me, "pThreadList")[tID];
  if (callNamed("voidp", tThread)) {
  return callNamed("error", _this, lingoBinary("joinPad", "Thread not found:", tID), symbol("closeThread"));
  }

  var tObjMgr = callNamed("getObjectManager");
  if (callNamed("objectp", tThread._interface)) {
  callMethod("Remove", tObjMgr, callMethod("getID", tThread._interface))
  }

  if (callNamed("objectp", tThread.component)) {
  callMethod("Remove", tObjMgr, callMethod("getID", tThread.component))
  }

  if (callNamed("objectp", tThread.handler)) {
  callMethod("Remove", tObjMgr, callMethod("getID", tThread.handler))
  }

  callMethod("Remove", tObjMgr, callMethod("getID", tThread))
  callMethod("deleteProp", meProp(_me, "pThreadList"), tID)
  return 1;
}

