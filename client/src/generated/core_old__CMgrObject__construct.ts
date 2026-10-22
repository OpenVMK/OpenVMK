// core.old.cct / CMgrObject / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "pObjectList", new LingoPropList([]));
  setMeProp(_me, "pUpdateList", new LingoList([]));
  setMeProp(_me, "pPrepareList", new LingoList([]));
  setMeProp(_me, "pManagerList", new LingoList([]));
  setMeProp(_me, "pInstanceList", new LingoList([]));
  setMeProp(_me, "pEraseLock", 0);
  setMeProp(_me, "pTimeOut", undefined);
  setMeProp(_me, "pUpdatePause", 0);
  setMeProp(_me, "pBaseClsMem", callNamed("script", "CObject"));
  callMethod("sort", meProp(_me, "pObjectList"))
  callMethod("sort", meProp(_me, "pUpdateList"))
  setMeProp(_me, "m_bLogger", 0);
  setMeProp(_me, "m_sLogger", "");
  return 1;
}

