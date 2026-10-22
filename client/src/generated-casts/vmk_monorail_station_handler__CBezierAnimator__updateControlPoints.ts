// vmk_monorail_station_handler.cct / CBezierAnimator / updateControlPoints

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateControlPoints(_me: LingoMe) {
  setMeProp(_me, "p2", callNamed("point", 0, 0));
  setMeProp(_me, "p4", callNamed("point", meProp(_me, "pLength"), 0));
  if (lingoBinary("gte", meProp(_me, "pTilt"), 0)) {
  setMeProp(_me, "p1", callNamed("point", 0, 0));
  } else {
  setMeProp(_me, "p1", callNamed("point", lingoBinary("mul", meProp(_me, "pTilt"), meProp(_me, "pLength")), 0));
  }

  if (lingoBinary("lte", meProp(_me, "pTilt"), 0)) {
  setMeProp(_me, "p3", callNamed("point", meProp(_me, "pLength"), 0));
  } else {
  setMeProp(_me, "p3", callNamed("point", lingoBinary("add", meProp(_me, "pLength"), lingoBinary("mul", meProp(_me, "pLength"), meProp(_me, "pTilt"))), 0));
  }

}

