// core.old.cct / CMgrThread / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  callMethod("closeAll", _this)
  setMeProp(_me, "pVarMngrObj", undefined);
  setMeProp(_me, "pIndexField", undefined);
  setMeProp(_me, "pObjBaseCls", undefined);
  return 1;
}

