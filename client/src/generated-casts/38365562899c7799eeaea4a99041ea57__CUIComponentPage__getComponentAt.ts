// 38365562899c7799eeaea4a99041ea57.cct / CUIComponentPage / getComponentAt

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getComponentAt(_me: LingoMe, t_iPos: LingoValue, t_bWithoutControlBar: LingoValue) {
  if (t_bWithoutControlBar) {
  var t_iCount = lingoBinary("sub", meProp(_me, "m_ar_components").count, 1);
  } else {
  t_iCount = meProp(_me, "m_ar_components").count;
  }

  if (lingoBinary("and", lingoBinary("gt", t_iPos, 0), lingoBinary("lte", t_iPos, t_iCount))) {
  return meProp(_me, "m_ar_components")[t_iPos];
  }

  return undefined;
}

