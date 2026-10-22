// 38365562899c7799eeaea4a99041ea57.cct / CQuestTemplateDataContainer / setData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setData(_me: LingoMe, t_ar_data: LingoValue) {
  for (var i = 1; i <= t_ar_data.count; ++i) {
  var t_iProp = callMethod("getPropAt", t_ar_data, i);
  var t_rValue = t_ar_data[i];
  switch (t_iProp) {
case symbol("questDurationInSecs"):
  meProp(_me, "m_ar_data")[symbol("questDurationInSecs")] = t_rValue;
  break;
case symbol("prizingMode"):
  meProp(_me, "m_ar_data")[symbol("prizingMode")] = t_rValue;
  break;
case symbol("description"):
  meProp(_me, "m_ar_data")[symbol("description")] = t_rValue;
  break;
case symbol("questName"):
  meProp(_me, "m_ar_data")[symbol("questName")] = t_rValue;
  break;
  default:
  callNamed("put", "Unimplemented value")
  }

  }

}

