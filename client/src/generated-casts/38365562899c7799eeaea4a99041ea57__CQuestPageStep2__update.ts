// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep2 / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, a_mp_kType_mp_iRef_rItem: LingoValue, a_kAlteredCategory: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  if (lingoBinary("eq", meProp(_me, "m_iCurPageName"), symbol("items"))) {
  }

  setMeProp(_me, "m_mp_kType_mp_iRef_rItem", a_mp_kType_mp_iRef_rItem);
  if (lingoBinary("neq", a_kAlteredCategory, "step2")) {
  var t_mp_kType_mp_iRef_rItem = a_mp_kType_mp_iRef_rItem[a_kAlteredCategory];
  }

  switch (a_kAlteredCategory) {
case symbol("items"):
  if (lingoBinary("neq", meProp(_me, "m_sSelectedTab"), "furnishings")) {
  return;
  }

  setMeProp(_me, "m_rGridRenderer", meProp(_me, "m_rGridFurnishings"));
  setMeProp(_me, "m_iSelected", -float(1));
  var t_mp_iType_rThumb = new LingoPropList([]);
  var t_iCount = t_mp_kType_mp_iRef_rItem.count;
  var t_iPageCount = lingoBinary("add", lingoBinary("div", t_iCount, meProp(_me, "m_iGridItemsPerPage")), 1);
  var t_iLastItem = t_iCount;
  if (lingoBinary("gt", t_iLastItem, lingoBinary("add", meProp(_me, "m_iGridOffsetFurni"), meProp(_me, "m_iGridItemsPerPage")))) {
  t_iLastItem = lingoBinary("add", meProp(_me, "m_iGridOffsetFurni"), meProp(_me, "m_iGridItemsPerPage"));
  }

  var t_ar_iNumbers = new LingoList([]);
  for (var i = lingoBinary("add", meProp(_me, "m_iGridOffsetFurni"), 1); i <= t_iLastItem; ++i) {
  callMethod("add", t_ar_iNumbers, t_mp_kType_mp_iRef_rItem[i].items)
  callMethod("addProp", t_mp_iType_rThumb, t_mp_kType_mp_iRef_rItem[i].code, undefined)
  }

  setMeProp(_me, "m_iFirst", lingoBinary("add", meProp(_me, "m_iGridOffsetFurni"), 1));
  setMeProp(_me, "m_iLast", t_iLastItem);
  if (lingoBinary("gt", t_mp_iType_rThumb.count, 0)) {
  callMethod("SetBufferElement", meProp(_me, "m_rGridLoadAnim"), callMethod("getElement", meProp(_me, "m_rWindow"), "quest.inventory"))
  callNamed("receiveUpdate", callMethod("getID", meProp(_me, "m_rGridLoadAnim")))
  }

  callNamed("executeMessage", "GetFurniThumbnail", t_mp_iType_rThumb, new LingoPropList([symbol("client"), callMethod("getID", _me), symbol("method"), symbol("_FurniThumbsReadyCbk"), symbol("items"), t_ar_iNumbers]))
  callMethod("checkTeleporterSelection", _me)
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "quest.inventory.page"), lingoBinary("join", lingoBinary("join", callNamed("string", lingoBinary("add", lingoBinary("div", meProp(_me, "m_iGridOffsetFurni"), 16), 1)), " / "), callNamed("string", t_iPageCount)))
  break;
case symbol("pins"):
  if (lingoBinary("neq", meProp(_me, "m_sSelectedTab"), "pins")) {
  return;
  }

  setMeProp(_me, "m_rGridRenderer", meProp(_me, "m_rGridPins"));
  setMeProp(_me, "m_iSelected", -float(1));
  var t_mp_iRef_rItem = t_mp_kType_mp_iRef_rItem;
  t_mp_iType_rThumb = new LingoPropList([]);
  t_iCount = t_mp_iRef_rItem.count;
  if (t_iCount) {
  t_iPageCount = lingoBinary("add", lingoBinary("div", t_iCount, meProp(_me, "m_iGridItemsPerPage")), 1);
  t_iLastItem = t_iCount;
  if (lingoBinary("gt", t_iLastItem, lingoBinary("add", meProp(_me, "m_iGridOffsetPins"), meProp(_me, "m_iGridItemsPerPage")))) {
  t_iLastItem = lingoBinary("add", meProp(_me, "m_iGridOffsetPins"), meProp(_me, "m_iGridItemsPerPage"));
  }

  setMeProp(_me, "m_iFirst", lingoBinary("add", meProp(_me, "m_iGridOffsetPins"), 1));
  setMeProp(_me, "m_iLast", t_iLastItem);
  t_ar_iNumbers = new LingoList([]);
  for (var i = lingoBinary("add", meProp(_me, "m_iGridOffsetPins"), 1); i <= t_iLastItem; ++i) {
  var t_rItem = t_mp_iRef_rItem[i];
  callMethod("add", t_ar_iNumbers, t_rItem.items)
  callMethod("addProp", t_mp_iType_rThumb, t_rItem.code, undefined)
  }

  if (lingoBinary("gt", t_mp_iType_rThumb.count, 0)) {
  callMethod("SetBufferElement", meProp(_me, "m_rGridLoadAnim"), callMethod("getElement", meProp(_me, "m_rWindow"), "quest.inventory"))
  callNamed("receiveUpdate", callMethod("getID", meProp(_me, "m_rGridLoadAnim")))
  }

  callNamed("executeMessage", "GetPinThumbnail", t_mp_iType_rThumb, new LingoPropList([symbol("client"), callMethod("getID", _me), symbol("method"), symbol("_PinThumbsReadyCbk"), symbol("items"), t_ar_iNumbers]))
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "quest.inventory.page"), lingoBinary("join", lingoBinary("join", callNamed("string", lingoBinary("add", lingoBinary("div", meProp(_me, "m_iGridOffsetPins"), 16), 1)), " / "), callNamed("string", t_iPageCount)))
  }

  break;
case symbol("posters"):
  if (lingoBinary("neq", meProp(_me, "m_sSelectedTab"), "posters")) {
  return;
  }

  setMeProp(_me, "m_rGridRenderer", meProp(_me, "m_rGridPosters"));
  setMeProp(_me, "m_iSelected", -float(1));
  t_mp_iType_rThumb = new LingoPropList([]);
  t_iCount = t_mp_kType_mp_iRef_rItem.count;
  t_iPageCount = lingoBinary("add", lingoBinary("div", t_iCount, meProp(_me, "m_iGridItemsPerPage")), 1);
  t_iLastItem = t_iCount;
  if (lingoBinary("gt", t_iLastItem, lingoBinary("add", meProp(_me, "m_iGridOffsetPosters"), meProp(_me, "m_iGridItemsPerPage")))) {
  t_iLastItem = lingoBinary("add", meProp(_me, "m_iGridOffsetPosters"), meProp(_me, "m_iGridItemsPerPage"));
  }

  setMeProp(_me, "m_iFirst", lingoBinary("add", meProp(_me, "m_iGridOffsetPosters"), 1));
  setMeProp(_me, "m_iLast", t_iLastItem);
  t_ar_iNumbers = new LingoList([]);
  for (var i = lingoBinary("add", meProp(_me, "m_iGridOffsetPosters"), 1); i <= t_iLastItem; ++i) {
  callMethod("add", t_ar_iNumbers, t_mp_kType_mp_iRef_rItem[i].items)
  callMethod("addProp", t_mp_iType_rThumb, t_mp_kType_mp_iRef_rItem[i].code, undefined)
  }

  if (lingoBinary("gt", t_mp_iType_rThumb.count, 0)) {
  callMethod("SetBufferElement", meProp(_me, "m_rGridLoadAnim"), callMethod("getElement", meProp(_me, "m_rWindow"), "quest.inventory"))
  callNamed("receiveUpdate", callMethod("getID", meProp(_me, "m_rGridLoadAnim")))
  }

  callNamed("executeMessage", "GetPosterThumbnail", t_mp_iType_rThumb, new LingoPropList([symbol("client"), callMethod("getID", _me), symbol("method"), symbol("_PosterThumbsReadyCbk"), symbol("items"), t_ar_iNumbers]))
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "quest.inventory.page"), lingoBinary("join", lingoBinary("join", callNamed("string", lingoBinary("add", lingoBinary("div", meProp(_me, "m_iGridOffsetPosters"), 16), 1)), " / "), callNamed("string", t_iPageCount)))
  break;
case symbol("clothes"):
  if (lingoBinary("neq", meProp(_me, "m_sSelectedTab"), "clothing")) {
  return;
  }

  setMeProp(_me, "m_rGridRenderer", meProp(_me, "m_rGridClothing"));
  setMeProp(_me, "m_iSelected", -float(1));
  var t_mp_ThumbData = new LingoPropList([]);
  var t_mp_data = t_mp_kType_mp_iRef_rItem;
  t_iCount = t_mp_data.count;
  t_iPageCount = lingoBinary("add", lingoBinary("div", t_iCount, meProp(_me, "m_iGridItemsPerPage")), 1);
  t_iLastItem = t_iCount;
  if (lingoBinary("gt", t_iLastItem, lingoBinary("add", meProp(_me, "m_iGridOffsetClothing"), meProp(_me, "m_iGridItemsPerPage")))) {
  t_iLastItem = lingoBinary("add", meProp(_me, "m_iGridOffsetClothing"), meProp(_me, "m_iGridItemsPerPage"));
  }

  setMeProp(_me, "m_iFirst", lingoBinary("add", meProp(_me, "m_iGridOffsetClothing"), 1));
  setMeProp(_me, "m_iLast", t_iLastItem);
  t_ar_iNumbers = new LingoList([]);
  for (var e = lingoBinary("add", meProp(_me, "m_iGridOffsetClothing"), 1); e <= t_iLastItem; ++e) {
  callMethod("add", t_ar_iNumbers, t_mp_data[e].items)
  callMethod("addProp", t_mp_ThumbData, t_mp_data[e].code, undefined)
  }

  if (lingoBinary("gt", t_mp_ThumbData.count, 0)) {
  callMethod("SetBufferElement", meProp(_me, "m_rGridLoadAnim"), callMethod("getElement", meProp(_me, "m_rWindow"), "quest.inventory"))
  callNamed("receiveUpdate", callMethod("getID", meProp(_me, "m_rGridLoadAnim")))
  }

  var t_mp_Data1 = new LingoPropList([symbol("client"), callMethod("getID", _me), symbol("method"), symbol("ClothesThumbsLoaded"), symbol("items"), t_ar_iNumbers]);
  callNamed("executeMessage", "GetClothThumbnail", t_mp_ThumbData, t_mp_Data1)
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "quest.inventory.page"), lingoBinary("join", lingoBinary("join", callNamed("string", lingoBinary("add", lingoBinary("div", meProp(_me, "m_iGridOffsetClothing"), 16), 1)), " / "), callNamed("string", t_iPageCount)))
  break;
case symbol("step2"):
case "step2":
  setMeProp(_me, "m_sSelectedTab", callMethod("GetStep2SelectedTab", callMethod("getInterface", callNamed("getThread", "QuestEngine"))));
  callMethod("HideTabs", _me)
  if ((lingoTruthy(lingoBinary("eq", meProp(_me, "m_sSelectedTab"), "credits")) ? 0 : 1)) {
  var t = callMethod("GetAllItemLists", callMethod("GetInventory", callNamed("getThread", "inventory").component, 1));
  if ((lingoTruthy(callNamed("voidp", t)) ? 0 : 1)) {
  if (lingoBinary("gt", t.count, 0)) {
  setMeProp(_me, "m_iCurPageName", symbol("items"));
  callMethod("update", _me, t, symbol("items"))
  } else {
  callMethod("delay", _me, 1000, symbol("RecycleUpdate"), new LingoList([a_mp_kType_mp_iRef_rItem, a_kAlteredCategory]))
  return;
  }

  } else {
  callNamed("put", "Could not get items-data from inventory")
  }

  } else {
  callMethod("creditsState", _me, 1)
  }

  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Unknown category updated in step2:", a_kAlteredCategory))
  break;
  }

  }

}

