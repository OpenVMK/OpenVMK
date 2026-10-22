// vmk_monorail_station_handler.cct / CBezierAnimator / setTilt

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setTilt(_me: LingoMe) {
  if (lingoBinary("gt", theProperty("paramCount"), 1)) {
  setMeProp(_me, "pTilt", callNamed("param", 2));
  }

  var xTilted = new LingoList([]);
  var yTilted = new LingoList([]);
  var rad = lingoBinary("div", lingoBinary("mul", meProp(_me, "pTilt"), callNamed("pi")), float(180));
  for (var i = 1; i <= meProp(_me, "pCurvePoints").vertexCount; ++i) {
  xTilted[i] = lingoBinary("sub", lingoBinary("mul", meProp(_me, "pCurvePoints").x[i], callNamed("cos", rad)), lingoBinary("mul", meProp(_me, "pCurvePoints").y[i], callNamed("sin", rad)));
  yTilted[i] = lingoBinary("add", lingoBinary("mul", meProp(_me, "pCurvePoints").x[i], callNamed("sin", rad)), lingoBinary("mul", meProp(_me, "pCurvePoints").y[i], callNamed("cos", rad)));
  }

  setThePropOf(meProp(_me, "pCurvePoints"), "x", xTilted);
  setThePropOf(meProp(_me, "pCurvePoints"), "y", yTilted);
}

