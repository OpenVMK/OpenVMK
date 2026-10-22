// d0e535313898676eb605277339b50f27.cct / CAvatarClothingMap / GetByTypeCode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetByTypeCode(_me: LingoMe, _this: LingoValue, a_iClothTypeCode: LingoValue) {
  var t_ar_sCasts = meProp(_me, "m_mp_sSet_ar_sCasts")[callNamed("string", a_iClothTypeCode)];
  if (callNamed("voidp", t_ar_sCasts)) {
  t_ar_sCasts = new LingoList([]);
  }

  return new LingoPropList([symbol("param"), new LingoPropList(["CASTS", t_ar_sCasts])]);
}

