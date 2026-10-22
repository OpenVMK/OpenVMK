// core.old.cct / CWindowScrollbarBACKUP / flipH

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function flipH(_me: LingoMe, tImg: LingoValue) {
  var tImage = callNamed("image", tImg.width, tImg.height, tImg.depth, tImg.paletteRef);
  var tQuad = new LingoList([callNamed("point", tImg.width, 0), callNamed("point", 0, 0), callNamed("point", 0, tImg.height), callNamed("point", tImg.width, tImg.height)]);
  callMethod("copyPixels", tImage, tImg, tQuad, tImg.rect, new LingoPropList([symbol("useFastQuads"), 1]))
  return tImage;
}

