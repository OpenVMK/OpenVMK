// core.old.cct / CWindowUniqueElement / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe) {
  callMethod("copyPixels", meProp(_me, "pBuffer").image, meProp(_me, "pImage"), meProp(_me, "pBuffer").image.rect, meProp(_me, "pImage").rect, meProp(_me, "pParams"))
}

