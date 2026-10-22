// vmk_jungle_cruise.cct / CCollisionEdge / draw

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function draw(_me: LingoMe, g: LingoValue, bAxionomicProjection: LingoValue) {
  callMethod("setColor", _me, callNamed("rgb", "#FFFF00"))
  var p1 = callNamed("point", meProp(_me, "origin").x, meProp(_me, "origin").y);
  var p2 = callNamed("point", lingoBinary("add", meProp(_me, "origin").x, meProp(_me, "direction").x), lingoBinary("add", meProp(_me, "origin").y, meProp(_me, "direction").y));
  if (bAxionomicProjection) {
  p1 = callNamed("ProjectAxonometricPosition", p1);
  p2 = callNamed("ProjectAxonometricPosition", p2);
  }

  callMethod("DrawLine", _me, g, p1, p2)
  var mx = lingoBinary("div", lingoBinary("add", meProp(_me, "origin").x, lingoBinary("add", meProp(_me, "origin").x, meProp(_me, "direction").x)), 2);
  var my = lingoBinary("div", lingoBinary("add", meProp(_me, "origin").y, lingoBinary("add", meProp(_me, "origin").y, meProp(_me, "direction").y)), 2);
  p1 = callNamed("point", mx, my);
  p2 = callNamed("point", lingoBinary("add", mx, lingoBinary("mul", meProp(_me, "normal").x, 20)), lingoBinary("add", my, lingoBinary("mul", meProp(_me, "normal").y, 20)));
  if (bAxionomicProjection) {
  p1 = callNamed("ProjectAxonometricPosition", p1);
  p2 = callNamed("ProjectAxonometricPosition", p2);
  }

  callMethod("setColor", _me, callNamed("rgb", 0, 255, 255))
  callMethod("DrawLine", _me, g, p1, p2)
}

