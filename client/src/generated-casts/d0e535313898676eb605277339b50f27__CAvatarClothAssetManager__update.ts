// d0e535313898676eb605277339b50f27.cct / CAvatarClothAssetManager / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("lt", meProp(_me, "m_ar_iLoading").count, meProp(_me, "m_iMaxLoading"))) {
  var t_iCount = meProp(_me, "m_ar_iPending").count;
  if (t_iCount) {
  for (var i = t_iCount; i >= 1; --i) {
  callMethod("LoadCastLibsForCloth", _this, undefined, meProp(_me, "m_ar_iPending")[i])
  }

  }

  }

}

