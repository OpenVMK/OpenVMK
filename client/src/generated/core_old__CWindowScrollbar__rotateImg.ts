// core.old.cct / CWindowScrollbar / rotateImg

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function rotateImg(_me: LingoMe, tImg: LingoValue, tDirection: LingoValue) {
  var tImage = callNamed("image", tImg.height, tImg.width, tImg.depth, tImg.paletteRef);
  var tQuad = new LingoList([callNamed("point", 0, 0), callNamed("point", tImg.height, 0), callNamed("point", tImg.height, tImg.width), callNamed("point", 0, tImg.width)]);
  tQuad = callMethod("RotateQuad", _me, tQuad, tDirection);
  callMethod("copyPixels", tImage, tImg, tQuad, tImg.rect)
  return tImage;
}

