// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogClothesView / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_rItemListObj", undefined);
  setMeProp(_me, "m_rWndObj", undefined);
  setMeProp(_me, "m_iLand", 6);
  setMeProp(_me, "m_iBalance", undefined);
  setMeProp(_me, "m_iPos", undefined);
  setMeProp(_me, "m_iId", undefined);
  setMeProp(_me, "m_iDefinedPageToShow", undefined);
  setMeProp(_me, "m_iDefinedSubPageToShow", undefined);
  setMeProp(_me, "m_bEnoughCredits", undefined);
  setMeProp(_me, "m_bGridRendered", 0);
  setMeProp(_me, "m_sActiveCategory", undefined);
  setMeProp(_me, "m_sSelectedTab", undefined);
  setMeProp(_me, "m_mpThumbCache", undefined);
  setMeProp(_me, "m_ar_ClothesToLoad", new LingoList([]));
  setMeProp(_me, "m_ar_components", new LingoPropList([]));
  setMeProp(_me, "m_mpCatalogData", new LingoPropList([]));
  setMeProp(_me, "m_fillColor", callNamed("rgb", 0, 31, 85));
  setMeProp(_me, "m_rGridRenderer", callNamed("createObject", callNamed("getUniqueID"), "CGenericThumbnailGrid"));
  setMeProp(_me, "m_rPrevierRenderer", callNamed("createObject", callNamed("getUniqueID"), "CGenericThumbnailGrid"));
  setMeProp(_me, "m_objLoadingWindow", undefined);
  setMeProp(_me, "m_iOffset", 0);
  setMeProp(_me, "m_bLoadingThumbnails", 1);
  setMeProp(_me, "m_rGridLoadAnim", callNamed("createObject", callNamed("getUniqueID"), "CMainThumbGridAnimator"));
  return 1;
}

