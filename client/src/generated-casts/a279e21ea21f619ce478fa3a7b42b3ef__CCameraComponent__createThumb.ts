// a279e21ea21f619ce478fa3a7b42b3ef.cct / CCameraComponent / createThumb

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";
import type { LingoImage } from "../lingo/lingo-builtins.js";
import { thumbFromPhoto } from "../lingo/lingo-photo.js";

// HAND-CORRECTED: the same 80x53 integer-ratio sampling, in bulk on the
// photo's palette indices (see processImage and lingo-photo.ts).
export function createThumb(_me: LingoMe, a_img: LingoValue) {
  return thumbFromPhoto(a_img as unknown as LingoImage, 80, 53) as unknown as LingoValue;
}

