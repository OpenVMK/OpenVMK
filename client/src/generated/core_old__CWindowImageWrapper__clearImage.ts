// core.old.cct / CWindowImageWrapper / clearImage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function clearImage(_me: LingoMe) {
  var tTargetRect = callNamed("rect", meProp(_me, "pOwnX"), meProp(_me, "pOwnY"), lingoBinary("add", meProp(_me, "pOwnX"), meProp(_me, "pOwnW")), lingoBinary("add", meProp(_me, "pOwnY"), meProp(_me, "pOwnH")));
  return callMethod("fill", _me.pBuffer.image, tTargetRect, _me.pProps[symbol("bgColor")]);
}

