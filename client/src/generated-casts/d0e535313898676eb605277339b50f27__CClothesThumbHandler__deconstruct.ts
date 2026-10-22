// d0e535313898676eb605277339b50f27.cct / CClothesThumbHandler / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  callNamed("unregisterMessage", "GetClothThumbnail", callMethod("getID", _this))
  callNamed("unregisterMessage", "GetClothPreview", callMethod("getID", _this))
  if (callNamed("objectp", meProp(_me, "m_objThumbCache"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_objThumbCache")))
  setMeProp(_me, "m_objThumbCache", undefined);
  }

  return 1;
}

