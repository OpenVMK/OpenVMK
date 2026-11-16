// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep2 / ClothesThumbsLoaded

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ClothesThumbsLoaded(_me: LingoMe, _this: LingoValue, a_mpItemList: LingoValue, a_rCallback: LingoValue) {
  callMethod("SetBufferElement", meProp(_me, "m_rGridLoadAnim"), undefined)
  callNamed("removeUpdate", callMethod("getID", meProp(_me, "m_rGridLoadAnim")))
  if (lingoBinary("and", callNamed("objectp", meProp(_me, "m_rWindow")), callNamed("listp", a_mpItemList))) {
  var t_mp_ItemInfo = new LingoPropList([]);
  for (var i = 1; i <= a_mpItemList.count; ++i) {
  var t_iID = callNamed("string", callMethod("getPropAt", a_mpItemList, i));
  var t_rImg = a_mpItemList[i];
  if (callNamed("voidp", t_rImg)) {
  if (callNamed("objectExists", "ClothesThumbCache")) {
  var t_mp_data = callMethod("GetCachedItem", callNamed("getObject", "ClothesThumbCache"), t_iID);
  if (callNamed("listp", t_mp_data)) {
  if (lingoBinary("gt", callMethod("findPos", t_mp_data, symbol("thumb")), 0)) {
  t_rImg = t_mp_data.thumb;
  }

  }

  }

  }

  callMethod("addProp", t_mp_ItemInfo, t_iID, new LingoPropList([symbol("thumbnail"), t_rImg, symbol("blend"), 100, symbol("items"), a_rCallback.items[i]]))
  }

  callMethod("render", meProp(_me, "m_rGridRenderer"), t_mp_ItemInfo, callMethod("getElement", meProp(_me, "m_rWindow"), "quest.inventory"))
  }

}

