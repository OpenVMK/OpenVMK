// a279e21ea21f619ce478fa3a7b42b3ef.cct / CCameraComponent / countCS

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";
import type { LingoImage } from "../lingo/lingo-builtins.js";
import { photoChecksum } from "../lingo/lingo-photo.js";

// HAND-CORRECTED: the same checksum over the photo's palette indices
// (`getPixel(...).paletteIndex` has no raster to read here). lingo-photo.ts.
export function countCS(_me: LingoMe, tImg: LingoValue) {
  return photoChecksum(tImg as unknown as LingoImage);
}


