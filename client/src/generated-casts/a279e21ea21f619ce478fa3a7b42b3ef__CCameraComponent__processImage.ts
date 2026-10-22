// a279e21ea21f619ce478fa3a7b42b3ef.cct / CCameraComponent / processImage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";
import type { LingoImage } from "../lingo/lingo-builtins.js";
import { sepiaFromImage } from "../lingo/lingo-photo.js";

// HAND-CORRECTED: the same sepia conversion, done in bulk (lingo-photo.ts).
// The Lingo walks every pixel with getPixel/setPixel, which in this runtime
// never read or write a real raster, so the photo came out blank; it would
// also be ~23,000 dispatched calls per shot. The result also carries the
// palette indices that `member.media` uploads.
export function processImage(_me: LingoMe, a_img: LingoValue) {
  var t_time = theProperty("milliSeconds");
  var tNu = sepiaFromImage(a_img as unknown as LingoImage);
  callNamed("put", lingoBinary("joinPad", "Camera.Component.processImage()", lingoBinary("sub", theProperty("milliSeconds"), t_time)))
  return tNu as unknown as LingoValue;
}

