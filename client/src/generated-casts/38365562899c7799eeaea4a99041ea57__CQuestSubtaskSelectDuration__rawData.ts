// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskSelectDuration / rawData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function rawData(_me: LingoMe, t_ar_data: LingoValue) {
  switch (t_ar_data[symbol("duration")]) {
case 60:
  var t_sElemID = "quest.duration1";
  break;
case lingoBinary("mul", 60, 15):
  t_sElemID = "quest.duration2";
  break;
case lingoBinary("mul", 60, 30):
  t_sElemID = "quest.duration3";
  break;
case lingoBinary("mul", 60, 60):
  t_sElemID = "quest.duration4";
  break;
case lingoBinary("mul", lingoBinary("mul", 60, 60), 2):
  t_sElemID = "quest.duration5";
  break;
case lingoBinary("mul", lingoBinary("mul", 60, 60), 3):
  t_sElemID = "quest.duration6";
  break;
case lingoBinary("mul", lingoBinary("mul", 60, 60), 8):
  t_sElemID = "quest.duration7";
  break;
case lingoBinary("mul", lingoBinary("mul", 60, 60), 16):
  t_sElemID = "quest.duration8";
  break;
  default:
  t_sElemID = "quest.duration1";
  }

  callMethod("clickElement", meProp(_me, "m_rRadioButton"), t_sElemID)
  callMethod("updateMenu", meProp(_me, "m_rRadioButton"))
}

