// d0e535313898676eb605277339b50f27.cct / CClothesPreviewCache / GetCachedItem

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetCachedItem(_me: LingoMe, a_iItemID: LingoValue) {
  var t_iPos = callMethod("findPos", meProp(_me, "m_mp_ThumbsCache"), a_iItemID);
  if (lingoBinary("gt", t_iPos, 0)) {
  return meProp(_me, "m_mp_ThumbsCache")[t_iPos];
  } else {
  return undefined;
  }

}

