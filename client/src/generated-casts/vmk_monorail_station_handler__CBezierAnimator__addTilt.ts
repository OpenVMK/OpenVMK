// vmk_monorail_station_handler.cct / CBezierAnimator / addTilt

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addTilt(_me: LingoMe) {
  var amount = 1;
  if (lingoBinary("gt", theProperty("paramCount"), 1)) {
  amount = callNamed("param", 2);
  }

  setMeProp(_me, "pTilt", lingoBinary("add", meProp(_me, "pTilt"), amount));
  callMethod("createCurvePoints", _me)
}

