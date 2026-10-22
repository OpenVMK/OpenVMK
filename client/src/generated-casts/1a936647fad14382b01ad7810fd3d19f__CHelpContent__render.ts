// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpContent / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe, g: LingoValue) {
  var tW = meProp(_me, "pImg").rect.width;
  var tH = meProp(_me, "pImg").rect.height;
  callMethod("copyPixels", g, meProp(_me, "pImg"), callNamed("rect", lingoBinary("add", meProp(_me, "pOffset")[1], 310), meProp(_me, "pOffset")[2], lingoBinary("add", lingoBinary("add", meProp(_me, "pOffset")[1], tW), 310), lingoBinary("add", meProp(_me, "pOffset")[2], tH)), meProp(_me, "pImg").rect)
  tW = meProp(_me, "pLayoutImg").rect.width;
  tH = meProp(_me, "pLayoutImg").rect.height;
  callMethod("copyPixels", g, meProp(_me, "pLayoutImg"), callNamed("rect", meProp(_me, "pOffset")[1], meProp(_me, "pOffset")[2], lingoBinary("add", meProp(_me, "pOffset")[1], tW), lingoBinary("add", meProp(_me, "pOffset")[2], tH)), meProp(_me, "pLayoutImg").rect)
}

