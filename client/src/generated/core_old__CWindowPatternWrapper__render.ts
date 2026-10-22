// core.old.cct / CWindowPatternWrapper / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe) {
  var tW = _me.pImage.width;
  var tH = _me.pImage.height;
  var tXW = lingoBinary("div", _me.pwidth, _me.pImage.width);
  var tXH = lingoBinary("div", _me.pheight, _me.pImage.height);
  for (var i = 0; i <= lingoBinary("sub", tXW, 1); ++i) {
  for (var j = 0; j <= lingoBinary("sub", tXH, 1); ++j) {
  var tXi = lingoBinary("add", _me.pLocX, lingoBinary("mul", i, tW));
  var tYi = lingoBinary("add", _me.pLocY, lingoBinary("mul", j, tH));
  var tRect = callNamed("rect", tXi, tYi, lingoBinary("add", tXi, tW), lingoBinary("add", tYi, tH));
  callMethod("copyPixels", _me.pBuffer.image, _me.pImage, tRect, _me.pImage.rect, _me.pParams)
  }

  }

}

