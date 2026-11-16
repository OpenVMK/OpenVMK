// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep2 / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_rGridFurnishings", callNamed("createObject", symbol("random"), "CGenericThumbnailGrid", "CGroupedThumbnailGrid"));
  setMeProp(_me, "m_rGridPins", callNamed("createObject", symbol("random"), "CGenericThumbnailGrid", "CGroupedThumbnailGrid"));
  setMeProp(_me, "m_rGridPosters", callNamed("createObject", symbol("random"), "CGenericThumbnailGrid", "CGroupedThumbnailGrid"));
  setMeProp(_me, "m_rGridClothing", callNamed("createObject", symbol("random"), "CGenericThumbnailGrid", "CGroupedThumbnailGrid"));
  setMeProp(_me, "m_rGridLoadAnim", callNamed("createObject", callNamed("getUniqueID"), "CMainThumbGridAnimator"));
  setMeProp(_me, "m_rGridLoadAnim2", callNamed("createObject", callNamed("getUniqueID"), "CMainThumbGridAnimator"));
  setMeProp(_me, "m_rGridRenderer", undefined);
  setMeProp(_me, "m_iSelected", -float(1));
  setMeProp(_me, "m_iFirst", 0);
  setMeProp(_me, "m_iLast", 0);
  callMethod("SetGridBgColor", meProp(_me, "m_rGridFurnishings"), callNamed("rgb", "#001F56"))
  callMethod("SetGridBgColor", meProp(_me, "m_rGridPins"), callNamed("rgb", "#001F56"))
  callMethod("SetGridBgColor", meProp(_me, "m_rGridPosters"), callNamed("rgb", "#001F56"))
  callMethod("SetGridBgColor", meProp(_me, "m_rGridClothing"), callNamed("rgb", "#001F56"))
  setMeProp(_me, "m_sSelectedTab", callMethod("GetStep2SelectedTab", callMethod("getInterface", callNamed("getThread", "QuestEngine"))));
  setMeProp(_me, "m_iAvailableCredits", 0);
  setMeProp(_me, "m_iCurrentPrize", 0);
  setMeProp(_me, "m_iPrizeStep", 50);
  setMeProp(_me, "m_iPrizeRankLoadCalls", 0);
  setMeProp(_me, "m_iCreditsState", symbol("inactive"));
  setMeProp(_me, "m_ar_components", new LingoPropList([]));
  setMeProp(_me, "m_mp_kType_mp_iRef_rItem", new LingoPropList([]));
  callMethod("sort", meProp(_me, "m_ar_components"))
  setMeProp(_me, "m_rWindow", undefined);
  setMeProp(_me, "m_rHiliterCol", callNamed("rgb", 255, 204, 0));
  setMeProp(_me, "m_rBorderCol", callNamed("rgb", 80, 160, 216));
  setMeProp(_me, "m_iGridItemsPerPage", 20);
  setMeProp(_me, "m_iGridOffsetFurni", 0);
  setMeProp(_me, "m_iGridOffsetPins", 0);
  setMeProp(_me, "m_iGridOffsetPosters", 0);
  setMeProp(_me, "m_iGridOffsetClothing", 0);
  setMeProp(_me, "m_ar_GiftItems", callNamed("getVariableValue", "GiftItems"));
  return 1;
}

