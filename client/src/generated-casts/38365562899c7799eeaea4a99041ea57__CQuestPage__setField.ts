// 38365562899c7799eeaea4a99041ea57.cct / CQuestPage / setField

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setField(_me: LingoMe, m_rWindow: LingoValue, t_sFieldName: LingoValue, t_sText: LingoValue) {
  if (callNamed("objectp", m_rWindow)) {
  var t_rTitleElem = callMethod("getElement", m_rWindow, t_sFieldName);
  if (lingoBinary("neq", t_rTitleElem, 0)) {
  callMethod("setText", t_rTitleElem, t_sText)
  }

  }

}

