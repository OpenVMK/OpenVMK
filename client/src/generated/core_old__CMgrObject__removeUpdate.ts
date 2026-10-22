// core.old.cct / CMgrObject / removeUpdate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removeUpdate(_me: LingoMe, _this: LingoValue, tID: LingoValue) {
  if (callNamed("voidp", meProp(_me, "pObjectList")[tID])) {
  return 0;
  }

  if (lingoBinary("lt", callMethod("getOne", meProp(_me, "pUpdateList"), meProp(_me, "pObjectList")[tID]), 1)) {
  return 0;
  }

  callMethod("deleteOne", meProp(_me, "pUpdateList"), meProp(_me, "pObjectList")[tID])
  if (lingoBinary("and", lingoBinary("eq", meProp(_me, "pPrepareList").count, 0), lingoBinary("eq", meProp(_me, "pUpdateList").count, 0))) {
  if (callNamed("objectp", meProp(_me, "pTimeOut"))) {
  callMethod("forget", meProp(_me, "pTimeOut"))
  setMeProp(_me, "pTimeOut", undefined);
  }

  }

  return 1;
}

