// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpMenuItem / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe, g: LingoValue, i: LingoValue) {
  var t = lingoBinary("div", lingoBinary("sub", _me.pLineHeight, meProp(_me, "pImg").rect.height), 2);
  var tW = meProp(_me, "pImg").rect.width;
  var tH = meProp(_me, "pImg").rect.height;
  var dy = lingoBinary("add", lingoBinary("mul", i, _me.pLineHeight), t);
  var tRect = callNamed("rect", 0, dy, tW, lingoBinary("add", dy, tH));
  callMethod("copyPixels", g, meProp(_me, "pImg"), tRect, meProp(_me, "pImg").rect)
}

