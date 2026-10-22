// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogClothesView / ThumbsLoaded

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ThumbsLoaded(_me: LingoMe, _this: LingoValue, a_mpItemList: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWndObj"))) {
  if (callNamed("objectp", callNamed("getWindow", callMethod("getID", meProp(_me, "m_rWndObj"))))) {
  callMethod("SetBufferElement", meProp(_me, "m_rGridLoadAnim"), undefined)
  callNamed("removeUpdate", callMethod("getID", meProp(_me, "m_rGridLoadAnim")))
  setMeProp(_me, "m_bLoadingThumbnails", 0);
  if (lingoBinary("and", callNamed("objectp", meProp(_me, "m_rWndObj")), callNamed("listp", a_mpItemList))) {
  setMeProp(_me, "m_bGridRendered", 0);
  setMeProp(_me, "m_mpThumbCache", callMethod("duplicate", a_mpItemList));
  var t_mp_ItemInfo = new LingoPropList([]);
  for (var i = 1; i <= a_mpItemList.count; ++i) {
  callMethod("addProp", t_mp_ItemInfo, callMethod("getPropAt", a_mpItemList, i), new LingoPropList([symbol("thumbnail"), a_mpItemList[i], symbol("blend"), 100]))
  }

  callMethod("render", meProp(_me, "m_rGridRenderer"), t_mp_ItemInfo, callMethod("getElement", meProp(_me, "m_rWndObj"), "thumbs.grid.b"))
  setMeProp(_me, "m_bGridRendered", 1);
  callMethod("ShowItemInfo", _this)
  }

  }

  }

}

