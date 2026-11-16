// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskAcquireItem / update

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
  setMeProp(_me, "m_iCurPageName", a_kAlteredCategory);
  meProp(_me, "m_mp_kType_mp_iRef_rItem")[a_kAlteredCategory] = a_mp_kType_mp_iRef_rItem;
  var t_iCount = a_mp_kType_mp_iRef_rItem.count;
  if (lingoBinary("gt", meProp(_me, "m_iPageNumber"), 1)) {
  if (lingoBinary("gt", lingoBinary("add", lingoBinary("mul", lingoBinary("sub", meProp(_me, "m_iPageNumber"), 1), meProp(_me, "m_iItemsPerPage")), 1), t_iCount)) {
  setMeProp(_me, "m_iPageNumber", 1);
  }

  } else {
  if (lingoBinary("lt", meProp(_me, "m_iPageNumber"), 1)) {
  setMeProp(_me, "m_iPageNumber", 1);
  }

  }

  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "quest.inventory.page"), lingoBinary("join", lingoBinary("join", meProp(_me, "m_iPageNumber"), "/"), callNamed("max", lingoBinary("add", lingoBinary("div", t_iCount, meProp(_me, "m_iItemsPerPage")), lingoBinary("gt", lingoBinary("mod", t_iCount, meProp(_me, "m_iItemsPerPage")), 0)), 1)))
  var t_iFirst = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", meProp(_me, "m_iPageNumber"), 1), meProp(_me, "m_iItemsPerPage")), 1);
  var t_iLast = callNamed("min", lingoBinary("mul", meProp(_me, "m_iPageNumber"), meProp(_me, "m_iItemsPerPage")), t_iCount);
  switch (a_kAlteredCategory) {
case symbol("items"):
  setMeProp(_me, "m_rGridRenderer", meProp(_me, "m_rGridFurnishings"));
  setMeProp(_me, "m_iSelected", -float(1));
  var t_mp_iType_rThumb = new LingoPropList([]);
  for (var i = t_iFirst; i <= t_iLast; ++i) {
  callMethod("addProp", t_mp_iType_rThumb, a_mp_kType_mp_iRef_rItem[i].code, undefined)
  }

  if (lingoBinary("gt", t_mp_iType_rThumb.count, 0)) {
  callMethod("SetBufferElement", meProp(_me, "m_rGridLoadAnim"), callMethod("getElement", meProp(_me, "m_rWindow"), "tra.objects"))
  callNamed("receiveUpdate", callMethod("getID", meProp(_me, "m_rGridLoadAnim")))
  }

  callNamed("executeMessage", "GetFurniThumbnail", t_mp_iType_rThumb, new LingoPropList([symbol("client"), callMethod("getID", _me), symbol("method"), symbol("_FurniThumbsReadyCbk")]))
  break;
case symbol("pins"):
  setMeProp(_me, "m_rGridRenderer", meProp(_me, "m_rGridPins"));
  setMeProp(_me, "m_iSelected", -float(1));
  var t_mp_iRef_rItem = a_mp_kType_mp_iRef_rItem;
  t_mp_iType_rThumb = new LingoPropList([]);
  if (lingoBinary("gt", t_iCount, 0)) {
  for (var i = t_iFirst; i <= t_iLast; ++i) {
  var t_rItem = t_mp_iRef_rItem[i];
  callMethod("addProp", t_mp_iType_rThumb, t_rItem.code, undefined)
  }

  }

  callNamed("executeMessage", "GetPinThumbnail", t_mp_iType_rThumb, new LingoPropList([symbol("client"), callMethod("getID", _me), symbol("method"), symbol("_PinThumbsReadyCbk")]))
  break;
case symbol("posters"):
  setMeProp(_me, "m_rGridRenderer", meProp(_me, "m_rGridPosters"));
  setMeProp(_me, "m_iSelected", -float(1));
  t_mp_iType_rThumb = new LingoPropList([]);
  for (var i = t_iFirst; i <= t_iLast; ++i) {
  callMethod("addProp", t_mp_iType_rThumb, a_mp_kType_mp_iRef_rItem[i].code, undefined)
  }

  callNamed("executeMessage", "GetPosterThumbnail", t_mp_iType_rThumb, new LingoPropList([symbol("client"), callMethod("getID", _me), symbol("method"), symbol("_PosterThumbsReadyCbk")]))
  break;
case symbol("clothes"):
  setMeProp(_me, "m_rGridRenderer", meProp(_me, "m_rGridClothing"));
  setMeProp(_me, "m_iSelected", -float(1));
  var t_mp_ThumbData = new LingoPropList([]);
  var t_mp_data = a_mp_kType_mp_iRef_rItem;
  for (var e = t_iFirst; e <= t_iLast; ++e) {
  callMethod("addProp", t_mp_ThumbData, t_mp_data[e].code, undefined)
  }

  if (lingoBinary("gt", t_mp_ThumbData.count, 0)) {
  callMethod("SetBufferElement", meProp(_me, "m_rGridLoadAnim"), callMethod("getElement", meProp(_me, "m_rWindow"), "tra.objects"))
  callNamed("receiveUpdate", callMethod("getID", meProp(_me, "m_rGridLoadAnim")))
  }

  callNamed("executeMessage", "GetClothThumbnail", t_mp_ThumbData, new LingoPropList([symbol("client"), callMethod("getID", _me), symbol("method"), symbol("ClothesThumbsLoaded")]))
  break;
case symbol("step2"):
case "step2":
case "acquireitem":
  setMeProp(_me, "m_sSelectedTab", "furniture");
  callMethod("HideTabs", _me)
  var t = callMethod("GetItemListByCategory", callMethod("GetInventory", callNamed("getThread", "inventory").component, 1), symbol("items"));
  if ((lingoTruthy(callNamed("voidp", t)) ? 0 : 1)) {
  callMethod("update", _me, t, symbol("items"))
  } else {
  callNamed("put", "Could not get items-data from inventory")
  }

  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Unknown category updated in step2:", a_kAlteredCategory))
  break;
  break;
  }

  }

}

