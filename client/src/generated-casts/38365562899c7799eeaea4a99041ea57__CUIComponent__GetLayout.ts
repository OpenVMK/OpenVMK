// 38365562899c7799eeaea4a99041ea57.cct / CUIComponent / GetLayout

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetLayout(_me: LingoMe, i_index: LingoValue) {
  if (lingoBinary("lte", i_index, meProp(_me, "m_ar_layouts").count)) {
  return meProp(_me, "m_ar_layouts")[i_index];
  }

  return undefined;
}

