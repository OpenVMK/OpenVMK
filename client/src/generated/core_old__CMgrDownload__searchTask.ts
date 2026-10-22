// core.old.cct / CMgrDownload / searchTask

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function searchTask(_me: LingoMe, tMemNameOrNum: LingoValue) {
  if (callNamed("stringp", tMemNameOrNum)) {
  if (lingoBinary("lt", callMethod("getPos", meProp(_me, "pReceivedTasks"), tMemNameOrNum), 1)) {
  return 0;
  }

  var tTaskData = new LingoPropList([symbol("name"), tMemNameOrNum, symbol("number"), callNamed("getmemnum", tMemNameOrNum), symbol("status"), undefined]);
  var tResource = meProp(_me, "pTaskQueue")[tMemNameOrNum];
  if (!lingoTruthy(callNamed("voidp", tResource))) {
  tTaskData[symbol("status")] = symbol("queue");
  }

  tResource = meProp(_me, "pActiveTasks")[tMemNameOrNum];
  if (!lingoTruthy(callNamed("voidp", tResource))) {
  tTaskData[symbol("status")] = symbol("Active");
  }

  tResource = callMethod("getPos", meProp(_me, "pCompleteTasks"), tMemNameOrNum);
  if (lingoBinary("gt", tResource, 0)) {
  tTaskData[symbol("status")] = symbol("complete");
  }

  if (lingoBinary("neq", tTaskData[symbol("status")], undefined)) {
  return tTaskData;
  }

  return callNamed("error", _me, lingoBinary("joinPad", "Referred task not found:", tMemNameOrNum), symbol("searchTask"));
  } else {
  if (callNamed("integerp", tMemNameOrNum)) {
  return callMethod("searchTask", _me, callNamed("member", tMemNameOrNum).name);
  }

  }

  return callNamed("error", _me, lingoBinary("joinPad", "Member's name or number expected:", tMemNameOrNum), symbol("searchTask"));
}

