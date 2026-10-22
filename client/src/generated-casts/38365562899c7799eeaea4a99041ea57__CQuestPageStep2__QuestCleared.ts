// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep2 / QuestCleared

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function QuestCleared(_me: LingoMe, t_ar_data: LingoValue) {
  if (t_ar_data[symbol("prizesCleared")]) {
  var t_sElemName = "quest.prizes";
  var t_rComponentPage = meProp(_me, "m_ar_components")[t_sElemName];
  var t_rClientElement = callMethod("getElement", meProp(_me, "m_rWindow"), t_sElemName);
  if (callNamed("objectp", t_rComponentPage)) {
  callMethod("deleteAllComponents", t_rComponentPage, 1)
  var t_rImg = callMethod("render", t_rComponentPage);
  callMethod("feedImage", t_rClientElement, t_rImg)
  }

  }

}

