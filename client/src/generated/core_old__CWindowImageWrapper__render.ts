// core.old.cct / CWindowImageWrapper / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe) {
  if (!lingoTruthy(_me.pVisible)) {
  return;
  }

  var tTargetRect = callNamed("rect", meProp(_me, "pOwnX"), meProp(_me, "pOwnY"), lingoBinary("add", meProp(_me, "pOwnX"), meProp(_me, "pOwnW")), lingoBinary("add", meProp(_me, "pOwnY"), meProp(_me, "pOwnH")));
  var tSourceRect = callNamed("rect", meProp(_me, "pOffX"), meProp(_me, "pOffY"), lingoBinary("add", meProp(_me, "pOffX"), meProp(_me, "pOwnW")), lingoBinary("add", meProp(_me, "pOffY"), meProp(_me, "pOwnH")));
  callMethod("copyPixels", _me.pBuffer.image, _me.pImage, tTargetRect, tSourceRect, _me.pParams)
}

