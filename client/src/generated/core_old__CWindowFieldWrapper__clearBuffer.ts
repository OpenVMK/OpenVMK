// core.old.cct / CWindowFieldWrapper / clearBuffer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function clearBuffer(_me: LingoMe) {
  return callMethod("fill", _me.pImage, _me.pImage.rect, _me.pProps[symbol("bgColor")]);
}

