// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep2 / updatePrizeRank

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updatePrizeRank(_me: LingoMe, t_ar_data: LingoValue, t_iRank: LingoValue, a_bDontUpate: LingoValue) {
  var t = theProperty("milliSeconds");
  var t_iMaxItemsPerRow = 3;
  var t_sElemName = "quest.prizes";
  var t_rComponentPage = meProp(_me, "m_ar_components")[t_sElemName];
  var t_rClientElement = callMethod("getElement", meProp(_me, "m_rWindow"), "quest.prizes");
  var t_rComponent = callMethod("getComponentAt", t_rComponentPage, t_iRank, 1);
  if ((lingoTruthy(callNamed("objectp", t_rComponent)) ? 0 : 1)) {
  t_rComponent = callMethod("addComponent", t_rComponentPage, "component.questengine.step2.prizeDesc.xml", 1, 1);
  }

  var i = t_iRank;
  callMethod("setText", callMethod("GetLayout", t_rComponent, 1), lingoBinary("join", lingoBinary("join", callNamed("rank2text", i), "\r"), callNamed("getText", "quest.prize")))
  callMethod("setText", callMethod("GetLayout", t_rComponent, 2), callNamed("string", t_ar_data[symbol("credits")]))
  var t_mp_iType_rThumb = new LingoPropList([]);
  for (var t_rItem of t_ar_data[symbol("item_array")].toArray()) {
  callMethod("setaProp", t_mp_iType_rThumb, t_rItem[symbol("itemCode")], undefined)
  }

  if (lingoBinary("gt", t_mp_iType_rThumb.count, 0)) {
  setMeProp(_me, "m_iPrizeRankLoadCalls", lingoBinary("add", meProp(_me, "m_iPrizeRankLoadCalls"), 1));
  if (lingoBinary("eq", meProp(_me, "m_iPrizeRankLoadCalls"), 1)) {
  callMethod("SetBufferElement", meProp(_me, "m_rGridLoadAnim2"), callMethod("getElement", meProp(_me, "m_rWindow"), "quest.prizes"))
  callNamed("receiveUpdate", callMethod("getID", meProp(_me, "m_rGridLoadAnim2")))
  }

  }

  callNamed("executeMessage", "GetMixedThumbnail", t_mp_iType_rThumb, new LingoPropList([symbol("client"), callMethod("getID", _me), symbol("method"), symbol("_PrizePreviewReadyCbk"), symbol("rank"), t_iRank, symbol("data"), t_ar_data]))
}

