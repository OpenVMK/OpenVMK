// vmk_mystics.cct /  / AssetsLoaded

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AssetsLoaded(_me: LingoMe, _this: LingoValue, a_iCloth: LingoValue) {
  if (callNamed("objectp", _this.m_rRenderer)) {
  callMethod("ClothingLoaded", _this.m_rRenderer.m_ObjRenderer, a_iCloth)
  }

}

