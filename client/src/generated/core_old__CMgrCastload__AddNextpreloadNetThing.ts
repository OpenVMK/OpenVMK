// core.old.cct / CMgrCastload / AddNextpreloadNetThing

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AddNextpreloadNetThing(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("lt", meProp(_me, "pCurrentDownLoads").count, callNamed("getIntVariable", "net.operation.count", 2))) {
  if (lingoBinary("gt", meProp(_me, "pWaitList").count, 0)) {
  if (lingoBinary("gt", callNamed("count", meProp(_me, "pWaitList")[1]), 0)) {
  var tFile = meProp(_me, "pWaitList")[1][1];
  var tURL = lingoBinary("join", lingoBinary("join", theProperty("moviePath"), tFile), meProp(_me, "pFileExtension"));
  var tID = callMethod("getPropAt", meProp(_me, "pWaitList"), 1);
  callMethod("deleteAt", meProp(_me, "pWaitList")[1], 1)
  if (lingoBinary("eq", callNamed("count", meProp(_me, "pWaitList")[1]), 0)) {
  callMethod("deleteProp", meProp(_me, "pWaitList"), callMethod("getPropAt", meProp(_me, "pWaitList"), 1))
  }

  meProp(_me, "pCurrentDownLoads")[tFile] = callNamed("createObject", symbol("temp"), callNamed("GetClsVariable", "castload.instance.class"));
  callMethod("Define", meProp(_me, "pCurrentDownLoads")[tFile], tFile, tURL, tID)
  callMethod("changeLoadingCount", meProp(_me, "pTaskList")[tID], 1)
  callNamed("receivePrepare", callMethod("getID", _this))
  return 1;
  }

  }

  }

  return 0;
}

