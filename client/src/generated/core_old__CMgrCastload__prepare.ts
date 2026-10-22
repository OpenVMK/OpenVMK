// core.old.cct / CMgrCastload / prepare

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function prepare(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("gt", callNamed("count", meProp(_me, "pTaskList")), 0)) {
  callMethod("AddNextpreloadNetThing", _this)
  callNamed("call", symbol("resetPercentCounter"), meProp(_me, "pTaskList"))
  callNamed("call", symbol("update"), meProp(_me, "pCurrentDownLoads"))
  }

}

