// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskAddTaskTime / rawData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function rawData(_me: LingoMe, t_ar_data: LingoValue) {
  switch (t_ar_data[symbol("timeLimitInSecs")]) {
case 5:
  var t_sElemID = "quest.tasktime1";
  break;
case 15:
  t_sElemID = "quest.tasktime2";
  break;
case 30:
  t_sElemID = "quest.tasktime3";
  break;
case 60:
  t_sElemID = "quest.tasktime4";
  break;
case 120:
  t_sElemID = "quest.tasktime5";
  break;
case 300:
  t_sElemID = "quest.tasktime6";
  break;
case 600:
  t_sElemID = "quest.tasktime7";
  break;
case 900:
  t_sElemID = "quest.tasktime8";
  break;
  default:
  t_sElemID = "quest.notimelimit";
  }

  callMethod("clickElement", meProp(_me, "m_rRadioButton"), t_sElemID)
  callMethod("updateMenu", meProp(_me, "m_rRadioButton"))
}

