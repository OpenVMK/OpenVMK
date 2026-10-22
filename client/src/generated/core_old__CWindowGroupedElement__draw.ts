// core.old.cct / CWindowGroupedElement / draw

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function draw(_me: LingoMe, tRGB: LingoValue) {
  if (!lingoTruthy(callNamed("ilk", tRGB, symbol("color")))) {
  tRGB = callNamed("rgb", 0, 0, 255);
  }

  var tTargetRect = callNamed("rect", meProp(_me, "pLocX"), meProp(_me, "pLocY"), lingoBinary("add", meProp(_me, "pLocX"), meProp(_me, "pwidth")), lingoBinary("add", meProp(_me, "pLocY"), meProp(_me, "pheight")));
  callMethod("draw", meProp(_me, "pBuffer").image, tTargetRect, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("color"), tRGB]))
}

