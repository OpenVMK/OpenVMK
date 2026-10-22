// 38365562899c7799eeaea4a99041ea57.cct / CQuestBasePage / _EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProc(_me: LingoMe, a_kEvent: LingoValue, a_sElem: LingoValue, a_vParam: LingoValue) {
  return callNamed("call", symbol("_EventProc"), new LingoList([meProp(_me, "m_rCurPageObj")]), a_kEvent, a_sElem, a_vParam);
}

