// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskSelectDuration / _EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProc(_me: LingoMe, a_kEvent: LingoValue, a_sElemID: LingoValue, a_vParam: LingoValue) {
  var tWndObj = meProp(_me, "m_rWindow");
  if (lingoBinary("eq", a_kEvent, symbol("mouseUp"))) {
  switch (a_sElemID) {
case "quest.duration1":
case "quest.duration2":
case "quest.duration3":
case "quest.duration4":
case "quest.duration5":
case "quest.duration6":
case "quest.duration7":
case "quest.duration8":
  callMethod("clickElement", meProp(_me, "m_rRadioButton"), a_sElemID)
  callMethod("updateMenu", meProp(_me, "m_rRadioButton"))
  break;
case "quest.duration1.hd":
case "quest.duration2.hd":
case "quest.duration3.hd":
case "quest.duration4.hd":
case "quest.duration5.hd":
case "quest.duration6.hd":
case "quest.duration7.hd":
case "quest.duration8.hd":
  callMethod("clickElement", meProp(_me, "m_rRadioButton"), callNamed("replaceChunks", a_sElemID, ".hd", ""))
  callMethod("updateMenu", meProp(_me, "m_rRadioButton"))
  break;
case "mes.accept.button":
  var t_rManager = callMethod("getManager", _me);
  if (callNamed("objectp", t_rManager)) {
  var t_ar_results = new LingoPropList([]);
  t_ar_results[symbol("duration")] = callMethod("getValue", meProp(_me, "m_rRadioButton"));
  callMethod("appendSubResult", t_rManager, t_ar_results)
  callMethod("resolveSubtask", t_rManager)
  callMethod("Activate", t_rManager)
  }

  break;
case "close":
case "quest.quit":
case "mes.deny.button":
  t_rManager = callMethod("getManager", _me);
  if (callNamed("objectp", t_rManager)) {
  callMethod("cancelSubtask", t_rManager)
  callMethod("Activate", t_rManager)
  }

  break;
case "help":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callNamed("executeMessage", symbol("open_help_page"), callNamed("getText", "help.quest.duration", callNamed("getText", "help.quest", "help.quest")), 1)
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Subtask.SelectDuration.event:", a_sElemID))
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  }

  }

}

