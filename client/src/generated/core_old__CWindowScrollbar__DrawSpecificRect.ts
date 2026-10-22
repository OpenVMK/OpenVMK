// core.old.cct / CWindowScrollbar / DrawSpecificRect

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DrawSpecificRect(_me: LingoMe, tdestrect: LingoValue, tElementPart: LingoValue, tstate: LingoValue) {
  var tImgPropName = lingoBinary("join", lingoBinary("join", tElementPart, "_"), tstate);
  callMethod("copyPixels", _me.pImage, callMethod("getProp", meProp(_me, "pButtonImg"), tImgPropName), tdestrect, callMethod("getProp", meProp(_me, "pButtonImg"), tImgPropName).rect)
}

