// 38365562899c7799eeaea4a99041ea57.cct / CScale9Grid / setTextStruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setTextStruct(_me: LingoMe, t_sTxt: LingoValue, t_sFont: LingoValue, t_iFontSize: LingoValue, t_sTxtAlignH: LingoValue, t_sTxtAlignV: LingoValue, t_bAntiAlias: LingoValue) {
  setMeProp(_me, "m_sTxt", t_sTxt);
  setMeProp(_me, "m_sFont", t_sFont);
  setMeProp(_me, "m_iFontSize", t_iFontSize);
  setMeProp(_me, "m_sTxtAlignH", t_sTxtAlignH);
  setMeProp(_me, "m_sTxtAlignV", t_sTxtAlignV);
  setMeProp(_me, "m_bAntiAlias", t_bAntiAlias);
  setMeProp(_me, "m_bNeedUpdate", 1);
}

