// d0e535313898676eb605277339b50f27.cct / CClothesPreviewRenderer / Define

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Define(_me: LingoMe, a_mp_ItemList: LingoValue, a_rCallback: LingoValue, a_sType: LingoValue) {
  setMeProp(_me, "m_rCallback", a_rCallback);
  setMeProp(_me, "m_sImageType", a_sType);
  callMethod("RenderClothes", _me, a_mp_ItemList)
}

