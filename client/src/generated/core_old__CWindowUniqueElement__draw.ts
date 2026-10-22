// core.old.cct / CWindowUniqueElement / draw

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
  tRGB = callNamed("rgb", 255, 0, 0);
  }

  callMethod("draw", meProp(_me, "pBuffer").image, meProp(_me, "pBuffer").image.rect, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("color"), tRGB]))
}

