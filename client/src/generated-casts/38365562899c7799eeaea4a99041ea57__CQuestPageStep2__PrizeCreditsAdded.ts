// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep2 / PrizeCreditsAdded

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PrizeCreditsAdded(_me: LingoMe, t_ar_data: LingoValue) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "DONE?", symbol("PrizeCreditsAdded")), t_ar_data))
  var t_sElemName = "quest.prizes";
  var t_rComponentPage = meProp(_me, "m_ar_components")[t_sElemName];
  var t_rClientElement = callMethod("getElement", meProp(_me, "m_rWindow"), t_sElemName);
  if (callNamed("objectp", t_rComponentPage)) {
  var t_iRank = lingoBinary("add", t_ar_data[symbol("rank")], 1);
  var t_rComponent = callMethod("getComponentAt", t_rComponentPage, t_iRank, 1);
  if ((lingoTruthy(callNamed("objectp", t_rComponent)) ? 0 : 1)) {
  t_ar_data = new LingoPropList([symbol("credits"), 0, symbol("item_index"), 1, symbol("item_count"), 0, symbol("item_array"), new LingoList([])]);
  callMethod("updatePrizeRank", _me, t_ar_data, callMethod("GetComponents", t_rComponentPage).count)
  return 0;
  }

  var t_rLayout = callMethod("GetLayout", t_rComponent, 2);
  if (callNamed("objectp", t_rLayout)) {
  callMethod("setText", t_rLayout, callNamed("string", t_ar_data[symbol("credits")]))
  setMeProp(_me, "m_iCurrentPrize", 0);
  callMethod("setPrize", _me, 0)
  var t_rImg = callMethod("render", t_rComponentPage);
  callMethod("feedImage", t_rClientElement, t_rImg)
  } else {
  callNamed("put", "Could not find cell")
  }

  } else {
  callNamed("put", "Could not find component")
  }

}

