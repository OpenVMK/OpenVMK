// d0e535313898676eb605277339b50f27.cct / CAvatarClothAssetManager / IsClothPending

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function IsClothPending(_me: LingoMe, _this: LingoValue, a_iClothTypeCode: LingoValue) {
  return lingoBinary("gt", callMethod("getOne", meProp(_me, "m_ar_iPending"), a_iClothTypeCode), 0);
}

