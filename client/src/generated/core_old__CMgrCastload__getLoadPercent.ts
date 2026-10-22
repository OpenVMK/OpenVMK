// core.old.cct / CMgrCastload / getLoadPercent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getLoadPercent(_me: LingoMe, _this: LingoValue, tID: LingoValue) {
  if (callNamed("voidp", tID)) {
  tID = meProp(_me, "pLatestTaskID");
  }

  if (!lingoTruthy(callNamed("voidp", meProp(_me, "pTaskList")[tID]))) {
  if (lingoBinary("eq", callMethod("getTaskState", meProp(_me, "pTaskList")[tID]), symbol("ready"))) {
  return float(1);
  } else {
  return callMethod("getTaskPercent", meProp(_me, "pTaskList")[tID]);
  }

  } else {
  return float(1);
  }

}

