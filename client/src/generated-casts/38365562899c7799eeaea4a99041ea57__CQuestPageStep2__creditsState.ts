// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep2 / creditsState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function creditsState(_me: LingoMe, a_bEnable: LingoValue) {
  var t_ar_ElemList = new LingoList(["quest.creditsprize.hd", "quest.credits.prize", "bg2", "quest.credits.toprize", "quest.credits.fromprize", "quest.prizecredits.hd", "quest.yourcredits.hd", "quest.credits.your", "bg", "back_stana", "jokuvaa"]);
  for (var t_sElem of t_ar_ElemList.toArray()) {
  callMethod("showHideElem", _me, meProp(_me, "m_rWindow"), t_sElem, a_bEnable)
  }

  if (a_bEnable) {
  callMethod("setCredits", _me, meProp(_me, "m_iAvailableCredits"))
  callMethod("setPrize", _me, meProp(_me, "m_iCurrentPrize"))
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "quest.inventory"))
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "quest.scrollbar"))
  } else {
  callMethod("show", callMethod("getElement", meProp(_me, "m_rWindow"), "quest.inventory"))
  callMethod("show", callMethod("getElement", meProp(_me, "m_rWindow"), "quest.scrollbar"))
  }

}

