// vmk_monorail_station_handler.cct / CBezierAnimator / getMousePoint

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getMousePoint(_me: LingoMe, tP: LingoValue) {
  var checkList = new LingoList([meProp(_me, "p2"), meProp(_me, "p3"), meProp(_me, "p4")]);
  setMeProp(_me, "pMovingOrigo", 0);
  for (var p of checkList.toArray()) {
  var dx = lingoBinary("sub", tP.locH, p.locH);
  var dy = lingoBinary("sub", tP.locV, p.locV);
  if (lingoBinary("lt", lingoBinary("add", lingoBinary("mul", dx, dx), lingoBinary("mul", dy, dy)), 100)) {
  return p;
  }

  }

  dx = lingoBinary("sub", tP.locH, meProp(_me, "p1").locH);
  dy = lingoBinary("sub", tP.locV, meProp(_me, "p1").locV);
  if (lingoBinary("lt", lingoBinary("add", lingoBinary("mul", dx, dx), lingoBinary("mul", dy, dy)), 100)) {
  setMeProp(_me, "pMovingOrigo", 1);
  return p;
  }

  return undefined;
}

