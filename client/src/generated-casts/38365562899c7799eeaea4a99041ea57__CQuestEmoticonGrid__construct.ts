// 38365562899c7799eeaea4a99041ea57.cct / CQuestEmoticonGrid / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_iMarginH", 1);
  setMeProp(_me, "m_iMarginV", 1);
  setMeProp(_me, "m_rcItemSize", callNamed("rect", 0, 0, 22, 22));
  setMeProp(_me, "m_iSlotsPerRow", 11);
  setMeProp(_me, "m_mp_iRef_rItem", new LingoPropList([]));
  setMeProp(_me, "m_rBufferImg", undefined);
  setMeProp(_me, "m_iSelected", 1);
  setMeProp(_me, "m_rImgElement", undefined);
  setMeProp(_me, "m_rHiliterCol", callNamed("rgb", 255, 204, 0));
  setMeProp(_me, "m_rBorderCol", callNamed("rgb", 80, 160, 216));
  setMeProp(_me, "m_kCategory", undefined);
  if (callNamed("objectExists", "ItemRenderer")) {
  setMeProp(_me, "m_rRenderer", callNamed("getObject", "ItemRenderer"));
  } else {
  setMeProp(_me, "m_rRenderer", callNamed("createObject", "ItemRenderer", "CTestItemThumbRenderer"));
  }

  return 1;
}

