// 24e5d5f4c8c8b7ba3f03a21ec75b8a91.cct / CCannedFieldManager / createNewCannedField

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createNewCannedField(_me: LingoMe, t_sWindowTitle: LingoValue, t_sFieldElement: LingoValue, t_pNormalColor: LingoValue, t_pErrorColor: LingoValue) {
  var tWndObj = callNamed("getWindow", t_sWindowTitle);
  if (lingoBinary("neq", tWndObj, 0)) {
  var tElem = callMethod("getElement", tWndObj, t_sFieldElement);
  if (lingoBinary("neq", tElem, 0)) {
  var t_uniqID = lingoBinary("join", t_sWindowTitle, t_sFieldElement);
  var t_pCannedField = callNamed("createObject", symbol("random"), "CComposeCannedMessage");
  callMethod("Init", t_pCannedField, t_sWindowTitle, t_sFieldElement, t_pNormalColor, t_pErrorColor)
  meProp(_me, "m_pCannedFields")[t_uniqID] = t_pCannedField;
  return t_pCannedField;
  } else {
  return 0;
  }

  } else {
  return 0;
  }

}

