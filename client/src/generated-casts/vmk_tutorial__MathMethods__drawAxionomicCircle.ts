// vmk_tutorial.cct / MathMethods / drawAxionomicCircle

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function drawAxionomicCircle(_me: LingoMe, _radius: LingoValue, _debug: LingoValue) {
  var tdim = lingoBinary("mul", lingoBinary("sub", callNamed("ProjectAxonometricPosition", callNamed("point", _radius, 0)), callNamed("point", 400, 300)), 3);
  var tImg = callNamed("image", tdim.locH, tdim.locV, 32);
  if (_debug) {
  callMethod("fill", tImg, tImg.rect, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("color"), callNamed("rgb", 200, 200, 200)]))
  }

  var i_ar_points = callNamed("createArc", 0, float(360), 0, 0, _radius, 24, 0, 1);
  if (_debug) {
  }

  for (var i = 1; i <= lingoBinary("sub", i_ar_points.count, 1); ++i) {
  var p1 = lingoBinary("add", i_ar_points[i], lingoBinary("div", tdim, 2));
  var p2 = lingoBinary("add", i_ar_points[lingoBinary("add", i, 1)], lingoBinary("div", tdim, 2));
  if (_debug) {
  }

  callMethod("draw", tImg, p1, p2, new LingoPropList([symbol("shapeType"), symbol("line"), symbol("lineSize"), 1, symbol("color"), callNamed("rgb", "#EEEEEE")]))
  }

  if (_debug) {
  for (var i = 1; i <= i_ar_points.count; ++i) {
  p1 = lingoBinary("add", i_ar_points[i], lingoBinary("div", tdim, 2));
  callNamed("put", p1)
  callMethod("setPixel", tImg, callNamed("integer", p1.locH), callNamed("integer", p1.locV), callNamed("rgb", 255, 0, 0))
  }

  p1 = lingoBinary("add", i_ar_points[1], lingoBinary("div", tdim, 2));
  callMethod("setPixel", tImg, callNamed("integer", p1.locH), callNamed("integer", p1.locV), callNamed("rgb", 0, 255, 0))
  }

  if (_debug) {
  var tMem = callNamed("new", symbol("bitmap"), callNamed("member", lingoBinary("add", callNamed("castLib", 2).member.count, 1), 2));
  setThePropOf(tMem, "name", "test");
  setThePropOf(tMem, "image", tImg);
  }

  return tImg;
}

