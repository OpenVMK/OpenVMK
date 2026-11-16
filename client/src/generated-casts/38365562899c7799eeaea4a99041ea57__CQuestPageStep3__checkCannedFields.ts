// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep3 / checkCannedFields

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function checkCannedFields(_me: LingoMe) {
  var t_iContentOK = 0;
  for (var i = 1; i <= meProp(_me, "m_ar_CannedFields").count; ++i) {
  var t_rCannedField = meProp(_me, "m_ar_CannedFields")[i];
  var t_sFieldName = callMethod("getPropAt", meProp(_me, "m_ar_CannedFields"), i);
  t_iContentOK = lingoBinary("add", t_iContentOK, callMethod("CheckContent", t_rCannedField));
  }

  return lingoBinary("eq", t_iContentOK, meProp(_me, "m_ar_CannedFields").count);
}

