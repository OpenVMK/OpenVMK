// core.old.cct / CMgrCastload / removeCastLoadTask

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removeCastLoadTask(_me: LingoMe, _this: LingoValue, tID: LingoValue) {
  if (lingoBinary("eq", callMethod("getTaskState", meProp(_me, "pTaskList")[tID]), symbol("ready"))) {
  callMethod("DoCallBack", meProp(_me, "pTaskList")[tID])
  callMethod("deconstruct", meProp(_me, "pTaskList")[tID])
  callMethod("deleteProp", meProp(_me, "pTaskList"), tID)
  }

}

