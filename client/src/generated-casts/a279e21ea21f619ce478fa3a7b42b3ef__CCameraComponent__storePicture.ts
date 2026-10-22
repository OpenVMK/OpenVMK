// a279e21ea21f619ce478fa3a7b42b3ef.cct / CCameraComponent / storePicture

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function storePicture(_me: LingoMe, tText: LingoValue) {
  callMethod("storePhotoCaption", callNamed("getBinaryManager"), lingoBinary("join", "SAVE_PICTURE_CAPTION /", tText), callMethod("getID", _me))
}

