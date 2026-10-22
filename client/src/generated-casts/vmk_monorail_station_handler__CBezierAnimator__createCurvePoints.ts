// vmk_monorail_station_handler.cct / CBezierAnimator / createCurvePoints

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createCurvePoints(_me: LingoMe) {
  var x1 = meProp(_me, "p1")[1];
  var x2 = meProp(_me, "p2")[1];
  var x3 = meProp(_me, "p3")[1];
  var x4 = meProp(_me, "p4")[1];
  var y1 = meProp(_me, "p1")[2];
  var y2 = meProp(_me, "p2")[2];
  var y3 = meProp(_me, "p3")[2];
  var y4 = meProp(_me, "p4")[2];
  setMeProp(_me, "pCurvePoints", new LingoPropList([]));
  var curveX = new LingoList([]);
  var curveY = new LingoList([]);
  var t = float(0);
  var step = lingoBinary("div", meProp(_me, "pFrameCount"), lingoBinary("mul", lingoBinary("mul", meProp(_me, "pFrameCount"), meProp(_me, "pFrameCount")), float(1)));
  for (var i = 0; i <= meProp(_me, "pFrameCount"); ++i) {
  t = lingoBinary("mul", step, i);
  curveX[lingoBinary("add", i, 1)] = lingoBinary("add", lingoBinary("add", lingoBinary("add", lingoBinary("mul", callNamed("power", lingoBinary("sub", 1, t), 3), x1), lingoBinary("mul", lingoBinary("mul", lingoBinary("mul", 3, t), callNamed("power", lingoBinary("sub", 1, t), 2)), x2)), lingoBinary("mul", lingoBinary("mul", lingoBinary("mul", 3, callNamed("power", t, 2)), lingoBinary("sub", 1, t)), x3)), lingoBinary("mul", callNamed("power", t, 3), x4));
  curveY[lingoBinary("add", i, 1)] = lingoBinary("add", lingoBinary("add", lingoBinary("add", lingoBinary("mul", callNamed("power", lingoBinary("sub", 1, t), 3), y1), lingoBinary("mul", lingoBinary("mul", lingoBinary("mul", 3, t), callNamed("power", lingoBinary("sub", 1, t), 2)), y2)), lingoBinary("mul", lingoBinary("mul", lingoBinary("mul", 3, callNamed("power", t, 2)), lingoBinary("sub", 1, t)), y3)), lingoBinary("mul", callNamed("power", t, 3), y4));
  }

  meProp(_me, "pCurvePoints")[symbol("x")] = curveX;
  meProp(_me, "pCurvePoints")[symbol("y")] = curveY;
  meProp(_me, "pCurvePoints")[symbol("vertexCount")] = curveX.count;
  callMethod("setTilt", _me)
}

