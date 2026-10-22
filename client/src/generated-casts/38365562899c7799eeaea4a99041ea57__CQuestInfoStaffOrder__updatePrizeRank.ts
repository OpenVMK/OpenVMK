// 38365562899c7799eeaea4a99041ea57.cct / CQuestInfoStaffOrder / updatePrizeRank

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updatePrizeRank(_me: LingoMe, t_ar_data: LingoValue, t_iRank: LingoValue, a_iTaken_prize_count: LingoValue) {
  var t_iMaxItemsPerRow = 2;
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

  callNamed("executeMessage", "GetItemThumbnail", t_mp_iType_rThumb)
  if (callNamed("voidp", t_ar_data[symbol("item_index")])) {
  t_ar_data[symbol("item_index")] = 1;
  }

  var t_index = t_ar_data[symbol("item_index")];
  var t_ar_items = callNamed("array_slice", t_ar_data[symbol("item_array")], t_index, t_iMaxItemsPerRow);
  while (lingoBinary("lt", t_ar_items.count, t_iMaxItemsPerRow)) {
  callMethod("append", t_ar_items, new LingoPropList([symbol("itemReference"), -float(1), symbol("itemCode"), -float(1)]))
  }

  var t_rThumbBg = callNamed("image", 40, 40, 32);
  setThePropOf(t_rThumbBg, "useAlpha", 1);
  var t_rLightBlue = callNamed("rgb", 39, 86, 146);
  var t_rDarkBLue = callNamed("rgb", "#001F56");
  callMethod("fill", t_rThumbBg, t_rThumbBg.rect, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("color"), t_rLightBlue]))
  for (var i = 1; i <= t_ar_items.count; ++i) {
  var t_ar_Item = t_ar_items[i];
  var t_iCode = t_ar_Item[symbol("itemCode")];
  var t_rLayout = callMethod("GetLayout", t_rComponent, lingoBinary("add", 3, i));
  if (callNamed("objectp", t_rLayout)) {
  var t_rIconImg = callMethod("duplicate", t_rThumbBg);
  if (lingoBinary("gt", t_iCode, -float(1))) {
  var t_rTempImg = callMethod("getaProp", t_mp_iType_rThumb, t_iCode);
  if (callNamed("objectp", t_rTempImg)) {
  callMethod("copyPixels", t_rIconImg, t_rTempImg, t_rTempImg.rect, t_rTempImg.rect, new LingoPropList([symbol("maskImage"), callMethod("extractAlpha", t_rTempImg), symbol("ink"), 36, symbol("useFastQuads"), 1]))
  }

  }

  callMethod("draw", t_rIconImg, t_rIconImg.rect, new LingoPropList([symbol("color"), meProp(_me, "m_rBorderCol"), symbol("shapeType"), symbol("rect"), symbol("lineSize"), 2]))
  callMethod("setIconImage", t_rLayout, t_rIconImg)
  callMethod("setNode", t_rLayout, t_ar_Item)
  }

  }

  var t_rImg = callMethod("render", t_rComponentPage);
  callMethod("feedImage", t_rClientElement, t_rImg)
}

