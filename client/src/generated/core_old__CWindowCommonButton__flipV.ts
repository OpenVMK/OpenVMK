// core.old.cct / CWindowCommonButton / flipV

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function flipV(_me: LingoMe, tImg: LingoValue) {
  var tImage = callNamed("image", tImg.width, tImg.height, tImg.depth, tImg.paletteRef);
  var tQuad = new LingoList([callNamed("point", 0, tImg.height), callNamed("point", tImg.width, tImg.height), callNamed("point", tImg.width, 0), callNamed("point", 0, 0)]);
  callMethod("copyPixels", tImage, tImg, tQuad, tImg.rect)
  return tImage;
}

