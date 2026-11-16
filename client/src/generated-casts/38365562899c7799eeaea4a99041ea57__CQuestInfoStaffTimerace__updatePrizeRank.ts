// 38365562899c7799eeaea4a99041ea57.cct / CQuestInfoStaffTimerace / updatePrizeRank

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updatePrizeRank(_me: LingoMe, t_ar_data: LingoValue, t_iRank: LingoValue, a_iTaken_prize_count: LingoValue) {
  var t_sElemName = "quest.prizes";
  var t_rComponentPage = meProp(_me, "m_ar_components")[t_sElemName];
  var t_rClientElement = callMethod("getElement", meProp(_me, "m_rWindow"), "quest.prizes");
  var t_rComponent = callMethod("getComponentAt", t_rComponentPage, t_iRank, 0);
  if ((lingoTruthy(callNamed("objectp", t_rComponent)) ? 0 : 1)) {
  t_rComponent = callMethod("addComponent", t_rComponentPage, "component.quest.join.prizes.xml", 0);
  }

  var i = lingoBinary("add", t_iRank, a_iTaken_prize_count);
  callMethod("setText", callMethod("GetLayout", t_rComponent, 1), lingoBinary("join", lingoBinary("join", callNamed("rank2text", i), "\r"), callNamed("getText", "quest.prize")))
  callMethod("setText", callMethod("GetLayout", t_rComponent, 2), callNamed("string", t_ar_data[symbol("credits")]))
  var t_mp_iType_rThumb = new LingoPropList([]);
  for (var t_rItem of t_ar_data[symbol("item_array")].toArray()) {
  callMethod("setaProp", t_mp_iType_rThumb, t_rItem[symbol("itemCode")], undefined)
  }

  if (lingoBinary("gt", t_mp_iType_rThumb.count, 0)) {
  callMethod("SetBufferElement", meProp(_me, "m_rGridLoadAnim"), callMethod("getElement", meProp(_me, "m_rWindow"), "quest.prizes"))
  callNamed("receiveUpdate", callMethod("getID", meProp(_me, "m_rGridLoadAnim")))
  }

  callNamed("executeMessage", "GetMixedThumbnail", t_mp_iType_rThumb, new LingoPropList([symbol("client"), callMethod("getID", _me), symbol("method"), symbol("_PrizePreviewReadyCbk"), symbol("rank"), t_iRank, symbol("data"), t_ar_data]))
  if (lingoBinary("eq", t_mp_iType_rThumb.count, 0)) {
  t_rComponent = callMethod("getComponentAt", t_rComponentPage, t_iRank, 0);
  if ((lingoTruthy(callNamed("objectp", t_rComponent)) ? 0 : 1)) {
  t_rComponent = callMethod("addComponent", t_rComponentPage, "component.quest.join.prizes.xml", 0);
  }

  var t_rThumbBg = callNamed("image", 40, 40, 32);
  setThePropOf(t_rThumbBg, "useAlpha", 1);
  var t_rLightBlue = callNamed("rgb", 39, 86, 146);
  callMethod("fill", t_rThumbBg, t_rThumbBg.rect, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("color"), t_rLightBlue]))
  for (var i = 1; i <= 2; ++i) {
  var t_rLayout = callMethod("GetLayout", t_rComponent, lingoBinary("add", 3, i));
  if (callNamed("objectp", t_rLayout)) {
  var t_rIconImg = callMethod("duplicate", t_rThumbBg);
  callMethod("draw", t_rIconImg, t_rIconImg.rect, new LingoPropList([symbol("color"), meProp(_me, "m_rBorderCol"), symbol("shapeType"), symbol("rect"), symbol("lineSize"), 2]))
  callMethod("setIconImage", t_rLayout, t_rIconImg)
  callMethod("setNode", t_rLayout, new LingoPropList([symbol("itemReference"), -float(1), symbol("itemCode"), -float(1)]))
  }

  }

  var t_rImg = callMethod("render", t_rComponentPage);
  callMethod("feedImage", t_rClientElement, t_rImg)
  }

}

