// eba88a10adbb7784498c2112110c5871.cct / CGuestRoomNavigator / ReallyCopyPixels

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ReallyCopyPixels(_me: LingoMe, a_rDestImg: LingoValue, a_rSrcImg: LingoValue, a_rectDest: LingoValue, a_rectSrc: LingoValue) {
  var tAlphaSrc = callMethod("extractAlpha", a_rSrcImg);
  var tAlphaDest = callMethod("extractAlpha", a_rSrcImg);
  callMethod("copyPixels", a_rDestImg, a_rSrcImg, a_rectDest, a_rectSrc)
  callMethod("copyPixels", tAlphaDest, tAlphaSrc, a_rectDest, a_rectSrc)
  callMethod("setAlpha", a_rDestImg, tAlphaDest)
  setThePropOf(a_rDestImg, "useAlpha", 1);
}

