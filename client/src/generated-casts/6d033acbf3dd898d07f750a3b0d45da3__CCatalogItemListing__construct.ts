// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogItemListing / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_mp_List", new LingoPropList([]));
  setMeProp(_me, "m_mpTopicByObject", new LingoPropList([]));
  setMeProp(_me, "m_objTopics", undefined);
  setMeProp(_me, "m_mpOrigServerData", undefined);
  setMeProp(_me, "m_rWndObj", undefined);
  setMeProp(_me, "m_sCurrentLand", undefined);
  setMeProp(_me, "m_iCategoryId", undefined);
  setMeProp(_me, "m_Img", undefined);
  setMeProp(_me, "m_ar_pTopics", new LingoList([]));
  setMeProp(_me, "m_ar_pLinks", new LingoList([]));
  setMeProp(_me, "m_ar_rects", new LingoList([]));
  setMeProp(_me, "m_fillColor", callNamed("rgb", 0, 51, 102));
  return 1;
}

