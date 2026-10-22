// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegPage1 / flipImage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function flipImage(_me: LingoMe, _this: LingoValue, tImg_a: LingoValue) {
  var tImg_b = callNamed("image", tImg_a.width, tImg_a.height, 32);
  var tQuad = new LingoList([callNamed("point", tImg_a.width, 0), callNamed("point", 0, 0), callNamed("point", 0, tImg_a.height), callNamed("point", tImg_a.width, tImg_a.height)]);
  callMethod("copyPixels", tImg_b, tImg_a, tQuad, tImg_a.rect)
  return tImg_b;
}

