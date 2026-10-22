// core.old.cct / CVisualizerXML / eventProcElementGroup

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcElementGroup(_me: LingoMe, _this: LingoValue, tEvent: LingoValue, tID: LingoValue, tParam: LingoValue) {
  callMethod("addProp", meProp(_me, "pEnterLeaveStack"), tEvent, tID)
}

