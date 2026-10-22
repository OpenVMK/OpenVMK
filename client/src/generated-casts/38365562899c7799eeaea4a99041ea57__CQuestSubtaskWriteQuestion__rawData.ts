// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskWriteQuestion / rawData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function rawData(_me: LingoMe, t_ar_data: LingoValue) {
  callNamed("put", lingoBinary("joinPad", "Fill blanks (Write Question)", t_ar_data))
  var t_ar_results = new LingoPropList([]);
  t_ar_results[symbol("taskType")] = t_ar_data[symbol("taskType")];
  t_ar_results[symbol("hint")] = t_ar_data[symbol("desc")];
  t_ar_results[symbol("photo")] = t_ar_data[symbol("photoId")];
  t_ar_results[symbol("correctAnswerID")] = t_ar_data[symbol("correctAnswerID")];
  t_ar_results[symbol("answers")] = t_ar_data[symbol("answers")];
  var t_rManager = callMethod("getManager", _me);
  if (callNamed("objectp", t_rManager)) {
  callMethod("appendSubResult", t_rManager, t_ar_results)
  }

  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.taskhint.input", t_ar_data[symbol("desc")])
  setMeProp(_me, "m_iCurrentID", t_ar_data[symbol("photoId")]);
  callMethod("reDraw", _me)
}

