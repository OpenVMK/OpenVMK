// d0e535313898676eb605277339b50f27.cct / CAvatarClothAssetManager / FlushQueue

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function FlushQueue(_me: LingoMe, _this: LingoValue) {
  for (var t_iCloth of meProp(_me, "m_ar_iPending").toArray()) {
  callMethod("deleteProp", meProp(_me, "m_mp_iCode_rProps"), t_iCloth)
  }

  setMeProp(_me, "m_ar_iPending", new LingoList([]));
}

