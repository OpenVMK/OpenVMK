// vmk_monorail_station_handler.cct / CBezierAnimator / showInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showInfo(_me: LingoMe) {
  var Info = new LingoList([meProp(_me, "p1").locH, meProp(_me, "p1").locV, meProp(_me, "p2").locH, meProp(_me, "p2").locV, meProp(_me, "p3").locH, meProp(_me, "p3").locV, meProp(_me, "p4").locH, meProp(_me, "p4").locV, meProp(_me, "pFrameCount"), meProp(_me, "pTilt")]);
  callNamed("put", Info)
}

