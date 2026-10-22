// vmk_monorail_station_handler.cct / CBezierAnimator / addLength

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addLength(_me: LingoMe) {
  var amount = 1;
  if (lingoBinary("gt", theProperty("paramCount"), 1)) {
  amount = callNamed("max", amount, callNamed("param", 2));
  }

  setMeProp(_me, "pLength", lingoBinary("add", meProp(_me, "pLength"), amount));
  setMeProp(_me, "p4", callNamed("point", meProp(_me, "pLength"), 0));
  callMethod("createCurvePoints", _me)
}

