// a279e21ea21f619ce478fa3a7b42b3ef.cct / CCameraViewFinder / liveFeed

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function liveFeed(_me: LingoMe) {
  callMethod("copyPixels", meProp(_me, "cameraLens"), _movie.stage.image, meProp(_me, "cameraLens").rect, meProp(_me, "pOffset"))
  callMethod("copyPixels", meProp(_me, "greyCamera"), meProp(_me, "cameraLens"), meProp(_me, "cameraLens").rect, meProp(_me, "cameraLens").rect, new LingoPropList([symbol("dither"), 1215]))
}

