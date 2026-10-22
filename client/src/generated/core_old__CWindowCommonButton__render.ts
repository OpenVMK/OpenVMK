// core.old.cct / CWindowCommonButton / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe) {
  callMethod("fill", _me.pBuffer.image, _me.pBuffer.image.rect, callNamed("rgb", 255, 255, 255))
  callMethod("copyPixels", _me.pBuffer.image, _me.pImage, _me.pBuffer.image.rect, _me.pImage.rect, _me.pParams)
}

