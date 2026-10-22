// d0e535313898676eb605277339b50f27.cct / CAvatarAnimator / AssetsLoaded

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AssetsLoaded(_me: LingoMe, a_iCloth: LingoValue) {
  var t_iPos = callMethod("findPos", meProp(_me, "m_ar_ClothesToLoad"), a_iCloth);
  if (lingoBinary("gt", t_iPos, 0)) {
  callMethod("deleteAt", meProp(_me, "m_ar_ClothesToLoad"), t_iPos)
  }

  if (lingoBinary("eq", meProp(_me, "m_ar_ClothesToLoad").count, 0)) {
  setMeProp(_me, "m_bAllClothesLoaded", 1);
  callMethod("AllClothesReady", _me)
  }

}

