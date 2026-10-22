// core.old.cct / CMgrDownload / updateQueue

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateQueue(_me: LingoMe) {
  if (lingoBinary("lt", meProp(_me, "pActiveTasks").count, callNamed("getIntVariable", "net.operation.count"))) {
  if (lingoBinary("gt", meProp(_me, "pTaskQueue").count, 0)) {
  var tTaskName = callMethod("getPropAt", meProp(_me, "pTaskQueue"), 1);
  var tTaskData = meProp(_me, "pTaskQueue")[tTaskName];
  callMethod("deleteProp", meProp(_me, "pTaskQueue"), tTaskName)
  meProp(_me, "pActiveTasks")[tTaskName] = callNamed("createObject", symbol("temp"), callNamed("getClassVariable", "download.instance.class"));
  callMethod("Define", meProp(_me, "pActiveTasks")[tTaskName], tTaskName, tTaskData)
  callNamed("receiveUpdate", callMethod("getID", _me))
  }

  }

  if (lingoBinary("eq", meProp(_me, "pActiveTasks").count, 0)) {
  callNamed("removeUpdate", callMethod("getID", _me))
  }

  return 1;
}

