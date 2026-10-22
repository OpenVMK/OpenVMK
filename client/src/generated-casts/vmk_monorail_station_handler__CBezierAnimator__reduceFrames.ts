// vmk_monorail_station_handler.cct / CBezierAnimator / reduceFrames

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function reduceFrames(_me: LingoMe) {
  var amount = 1;
  if (lingoBinary("gt", theProperty("paramCount"), 1)) {
  amount = callNamed("max", amount, callNamed("param", 2));
  }

  setMeProp(_me, "pFrameCount", callNamed("max", 6, lingoBinary("sub", meProp(_me, "pFrameCount"), amount)));
  callMethod("createCurvePoints", _me)
}

