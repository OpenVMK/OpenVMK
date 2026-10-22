// 38365562899c7799eeaea4a99041ea57.cct / CQuestTemplateDataContainer / checkTestingStatus

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function checkTestingStatus(_me: LingoMe) {
  var t_rCurrentPage = callMethod("getPage", callMethod("GetBase", callMethod("getInterface", meProp(_me, "m_rInterface"))));
  var t_bTestStatus = 0;
  if (lingoBinary("gt", meProp(_me, "m_ar_data")[symbol("status")], 1)) {
  t_bTestStatus = 1;
  } else {
  if (lingoBinary("and", lingoBinary("and", lingoBinary("and", lingoBinary("gt", meProp(_me, "m_ar_data")[symbol("description")].length, 0), lingoBinary("gt", meProp(_me, "m_ar_data")[symbol("questName")].length, 0)), lingoBinary("gt", meProp(_me, "m_ar_data")[symbol("task_array")].count, 0)), lingoBinary("gt", meProp(_me, "m_ar_data")[symbol("prize_array")].count, 0))) {
  var t_iCredits = 0;
  var t_iPrizeCount = 0;
  for (var t_ar_prize of meProp(_me, "m_ar_data")[symbol("prize_array")].toArray()) {
  t_iCredits = lingoBinary("add", t_iCredits, t_ar_prize[symbol("credits")]);
  t_iPrizeCount = lingoBinary("add", t_iPrizeCount, t_ar_prize[symbol("item_array")].count);
  }

  if (lingoBinary("or", lingoBinary("gt", t_iCredits, 0), lingoBinary("gt", t_iPrizeCount, 0))) {
  t_bTestStatus = 1;
  }

  }

  }

  if (callNamed("objectp", t_rCurrentPage)) {
  switch (meProp(_me, "m_sCurrentPage")) {
case "step1":
case "step2":
case "step3":
  callMethod("setTestingStatus", t_rCurrentPage, t_bTestStatus)
  break;
  default:
  callNamed("put", "Unknown page")
  break;
  break;
  }

  }

}

