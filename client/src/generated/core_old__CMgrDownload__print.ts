// core.old.cct / CMgrDownload / print

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function print(_me: LingoMe) {
  var tListList = new LingoList([meProp(_me, "pActiveTasks"), meProp(_me, "pTaskQueue"), meProp(_me, "pReceivedTasks")]);
  for (var tList of tListList.toArray()) {
  var tListMode = callNamed("ilk", tList);
  for (var i = 1; i <= tList.count; ++i) {
  if (lingoBinary("eq", tListMode, symbol("list"))) {
  var tID = i;
  } else {
  tID = callMethod("getPropAt", tList, i);
  }

  if (callNamed("symbolp", tID)) {
  tID = lingoBinary("join", "#", tID);
  }

  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", tID, ":"), tList[i]))
  }

  }

  return 1;
}

