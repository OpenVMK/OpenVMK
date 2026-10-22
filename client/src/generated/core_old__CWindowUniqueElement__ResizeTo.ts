// core.old.cct / CWindowUniqueElement / ResizeTo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ResizeTo(_me: LingoMe, tX: LingoValue, tY: LingoValue) {
  var tOffX = lingoBinary("sub", tX, meProp(_me, "pSprite").width);
  var tOffY = lingoBinary("sub", tY, meProp(_me, "pSprite").height);
  return callMethod("ResizeBy", _me, tOffX, tOffY);
}

