// 38365562899c7799eeaea4a99041ea57.cct / CQuestPage / showHideElem

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showHideElem(_me: LingoMe, m_rWindow: LingoValue, t_sElemName: LingoValue, a_bState: LingoValue) {
  var t_rElem = callMethod("getElement", m_rWindow, t_sElemName);
  if (lingoBinary("neq", t_rElem, 0)) {
  if (a_bState) {
  callMethod("show", t_rElem)
  } else {
  callMethod("hide", t_rElem)
  }

  }

}

