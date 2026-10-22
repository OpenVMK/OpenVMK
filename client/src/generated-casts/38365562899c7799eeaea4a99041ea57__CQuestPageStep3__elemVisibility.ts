// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep3 / elemVisibility

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function elemVisibility(_me: LingoMe, a_sElemID: LingoValue, a_bVisible: LingoValue) {
  var t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), a_sElemID);
  if (lingoBinary("neq", t_rElem, 0)) {
  if (a_bVisible) {
  callMethod("show", t_rElem)
  } else {
  callMethod("hide", t_rElem)
  }

  }

}

