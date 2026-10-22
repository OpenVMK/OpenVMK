// vmk_tutorial.cct / MathMethods / createArc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createArc(_me: LingoMe, _s: LingoValue, _a: LingoValue, _x: LingoValue, _y: LingoValue, _r: LingoValue, _p: LingoValue, _d: LingoValue, _axonometric: LingoValue) {
  if (callNamed("voidp", _p)) {
  _p = 10;
  }

  var anglestep = lingoBinary("div", _a, _p);
  var srad = lingoBinary("div", lingoBinary("mul", _s, callNamed("pi")), 180);
  var radstep = lingoBinary("div", lingoBinary("mul", anglestep, callNamed("pi")), float(180));
  var pnts = new LingoList([]);
  var ax = lingoBinary("mul", _r, callNamed("cos", srad));
  var ay = lingoBinary("mul", _r, callNamed("sin", srad));
  if (_axonometric) {
  var tp = lingoBinary("sub", callNamed("ProjectAxonometricPosition", callNamed("point", ax, ay)), callNamed("point", 400, 300));
  ax = tp.locH;
  ay = tp.locV;
  }

  callMethod("add", pnts, callNamed("point", ax, ay))
  if (_d) {
  callNamed("updateStage")
  }

  for (var i = 1; i <= _p; ++i) {
  ax = lingoBinary("mul", _r, callNamed("cos", lingoBinary("add", srad, lingoBinary("mul", radstep, i))));
  ay = lingoBinary("mul", _r, callNamed("sin", lingoBinary("add", srad, lingoBinary("mul", radstep, i))));
  if (_axonometric) {
  tp = lingoBinary("sub", callNamed("ProjectAxonometricPosition", callNamed("point", ax, ay)), callNamed("point", 400, 300));
  ax = tp.locH;
  ay = tp.locV;
  }

  callMethod("add", pnts, callNamed("point", ax, ay))
  if (_d) {
  callMethod("setPixel", _movie.stage.image, lingoBinary("add", _x, ax), lingoBinary("add", _y, ay), callNamed("rgb", 255, 255, 255))
  }

  }

  if (_d) {
  callNamed("updateStage")
  }

  return pnts;
}

