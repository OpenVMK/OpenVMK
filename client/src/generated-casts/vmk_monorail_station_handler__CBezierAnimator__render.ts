// vmk_monorail_station_handler.cct / CBezierAnimator / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe, g: LingoValue, _offset: LingoValue) {
  setMeProp(_me, "pOffset", _offset);
  for (var i = 1; i <= meProp(_me, "pCurvePoints").vertexCount; ++i) {
  var tP = lingoBinary("add", callNamed("point", meProp(_me, "pCurvePoints").x[i], meProp(_me, "pCurvePoints").y[i]), meProp(_me, "pOffset"));
  var clr = callNamed("rgb", "#000000");
  callMethod("fill", g, lingoBinary("sub", tP, callNamed("point", 2, 2)), lingoBinary("add", tP, callNamed("point", 2, 2)), new LingoPropList([symbol("color"), clr]))
  }

  var checkList = new LingoList([meProp(_me, "p1"), meProp(_me, "p4")]);
  i = 8;
  for (var p of checkList.toArray()) {
  tP = lingoBinary("add", p, meProp(_me, "pOffset"));
  clr = callNamed("rgb", "#FF0000");
  callMethod("fill", g, lingoBinary("sub", tP, callNamed("point", i, i)), lingoBinary("add", tP, callNamed("point", i, i)), new LingoPropList([symbol("color"), clr]))
  i = lingoBinary("sub", i, 4);
  }

  checkList = new LingoList([meProp(_me, "p2"), meProp(_me, "p3")]);
  for (var p of checkList.toArray()) {
  tP = lingoBinary("add", p, meProp(_me, "pOffset"));
  clr = callNamed("rgb", "#0000FF");
  callMethod("fill", g, lingoBinary("sub", tP, callNamed("point", 4, 4)), lingoBinary("add", tP, callNamed("point", 4, 4)), new LingoPropList([symbol("color"), clr]))
  }

}

