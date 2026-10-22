// 38365562899c7799eeaea4a99041ea57.cct / CQuestWindowManager / appendSubResult

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function appendSubResult(_me: LingoMe, t_ar_results: LingoValue) {
  for (var i = 1; i <= t_ar_results.count; ++i) {
  var t_iProp = callMethod("getPropAt", t_ar_results, i);
  var t_iValue = t_ar_results[i];
  meProp(_me, "m_ar_results")[t_iProp] = t_iValue;
  }

}

