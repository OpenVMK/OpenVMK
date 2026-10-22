// core.old.cct / CWindowDropDown / reDraw

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function reDraw(_me: LingoMe) {
  callMethod("copyPixels", _me.pBuffer.image, _me.pImage, _me.pImage.rect, _me.pImage.rect, new LingoPropList([symbol("useFastQuads"), 1]))
}

