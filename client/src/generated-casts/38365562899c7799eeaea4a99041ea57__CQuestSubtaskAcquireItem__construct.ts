// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskAcquireItem / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_rGridFurnishings", callNamed("createObject", symbol("random"), "CGenericThumbnailGrid"));
  setMeProp(_me, "m_rGridPins", callNamed("createObject", symbol("random"), "CGenericThumbnailGrid"));
  setMeProp(_me, "m_rGridPosters", callNamed("createObject", symbol("random"), "CGenericThumbnailGrid"));
  setMeProp(_me, "m_rGridClothing", callNamed("createObject", symbol("random"), "CGenericThumbnailGrid"));
  setMeProp(_me, "m_rGridRenderer", undefined);
  setMeProp(_me, "m_iSelected", -float(1));
  setMeProp(_me, "m_rGridLoadAnim", callNamed("createObject", callNamed("getUniqueID"), "CMainThumbGridAnimator"));
  setMeProp(_me, "m_mp_kType_mp_iRef_rItem", new LingoPropList([]));
  setMeProp(_me, "m_ar_components", new LingoPropList([]));
  callMethod("sort", meProp(_me, "m_ar_components"))
  setMeProp(_me, "m_rWindow", undefined);
  setMeProp(_me, "m_sSelectedTab", "furniture");
  setMeProp(_me, "m_iPageNumber", 1);
  setMeProp(_me, "m_iItemsPerPage", 28);
  return 1;
}

