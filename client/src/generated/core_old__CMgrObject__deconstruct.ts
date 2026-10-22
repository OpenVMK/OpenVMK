// core.old.cct / CMgrObject / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "pEraseLock", 1);
  if (callNamed("objectp", meProp(_me, "pTimeOut"))) {
  callMethod("forget", meProp(_me, "pTimeOut"))
  setMeProp(_me, "pTimeOut", undefined);
  }

  for (var i = meProp(_me, "pInstanceList").count; i >= 1; --i) {
  callMethod("Remove", _this, meProp(_me, "pInstanceList")[i])
  }

  for (var i = meProp(_me, "pManagerList").count; i >= 1; --i) {
  callMethod("Remove", _this, meProp(_me, "pManagerList")[i])
  }

  setMeProp(_me, "pObjectList", new LingoPropList([]));
  setMeProp(_me, "pUpdateList", new LingoList([]));
  setMeProp(_me, "pPrepareList", new LingoList([]));
  return 1;
}

