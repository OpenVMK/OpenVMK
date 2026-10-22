// core.old.cct / CWindowGroupedElement / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe) {
  var tTargetRect = callNamed("rect", meProp(_me, "pLocX"), meProp(_me, "pLocY"), lingoBinary("add", meProp(_me, "pLocX"), meProp(_me, "pwidth")), lingoBinary("add", meProp(_me, "pLocY"), meProp(_me, "pheight")));
  var tSourceRect = meProp(_me, "pImage").rect;
  if (meProp(_me, "pUseAlpha")) {
  var tBuffer = meProp(_me, "pBuffer").image;
  setThePropOf(tBuffer, "useAlpha", 0);
  callMethod("copyPixels", tBuffer, meProp(_me, "pImage"), tTargetRect, tSourceRect, meProp(_me, "pParams"))
  setThePropOf(tBuffer, "useAlpha", 1);
  var tAlpha = callMethod("extractAlpha", tBuffer);
  callMethod("copyPixels", tAlpha, callMethod("extractAlpha", meProp(_me, "pImage")), tTargetRect, tSourceRect, new LingoPropList([symbol("ink"), 39]))
  callMethod("setAlpha", tBuffer, tAlpha)
  setThePropOf(tBuffer, "useAlpha", 1);
  } else {
  callMethod("copyPixels", meProp(_me, "pBuffer").image, meProp(_me, "pImage"), tTargetRect, tSourceRect, meProp(_me, "pParams"))
  }

}

