// core.old.cct / CMgrThread / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "pThreadList", new LingoPropList([]));
  setMeProp(_me, "pVarMngrObj", callNamed("createObject", symbol("temp"), callNamed("GetClsVariable", "variable.manager.class")));
  setMeProp(_me, "pIndexField", callNamed("getVariable", "thread.index.field"));
  setMeProp(_me, "pObjBaseCls", callNamed("script", callNamed("getmemnum", "CObject")));
  return 1;
}

