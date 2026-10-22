// 24e5d5f4c8c8b7ba3f03a21ec75b8a91.cct / CComposeCannedMessage / Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Init(_me: LingoMe, t_sWindowTitle: LingoValue, t_sFieldElement: LingoValue, t_pNormalColor: LingoValue, t_pErrorColor: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", t_sWindowTitle)) ? 0 : 1)) {
  setMeProp(_me, "m_sWndTitle", t_sWindowTitle);
  }

  if ((lingoTruthy(callNamed("voidp", t_sFieldElement)) ? 0 : 1)) {
  setMeProp(_me, "m_sClientElement", t_sFieldElement);
  }

  if ((lingoTruthy(callNamed("voidp", t_pNormalColor)) ? 0 : 1)) {
  setMeProp(_me, "m_colorInput", t_pNormalColor);
  }

  if ((lingoTruthy(callNamed("voidp", t_pErrorColor)) ? 0 : 1)) {
  setMeProp(_me, "m_colorNonMatch", t_pErrorColor);
  }

}

