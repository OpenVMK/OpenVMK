// core.old.cct / CMgrDownload / getLoadPercent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getLoadPercent(_me: LingoMe, tMemNameOrNum: LingoValue) {
  if (callNamed("integerp", tMemNameOrNum)) {
  var tMemName = callNamed("member", tMemNameOrNum).name;
  } else {
  if (callNamed("stringp", tMemNameOrNum)) {
  tMemName = tMemNameOrNum;
  } else {
  return callNamed("error", _me, lingoBinary("joinPad", "Member's name or number expected:", tMemNameOrNum), symbol("getLoadPercent"));
  }

  }

  if (lingoBinary("eq", callMethod("getOne", meProp(_me, "pReceivedTasks"), tMemName), 0)) {
  return callNamed("error", _me, lingoBinary("joinPad", "Downloaded file not found:", tMemName), symbol("getLoadPercent"));
  }

  if (!lingoTruthy(callNamed("voidp", meProp(_me, "pActiveTasks")[tMemName]))) {
  return callMethod("getProperty", meProp(_me, "pActiveTasks")[tMemName], symbol("Percent"));
  } else {
  if (!lingoTruthy(callNamed("voidp", meProp(_me, "pTaskQueue")[tMemName]))) {
  return float(0);
  } else {
  if (callMethod("getOne", meProp(_me, "pCompleteTasks"), tMemName)) {
  return float(1);
  }

  }

  }

  return float(1);
}

