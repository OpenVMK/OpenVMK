// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskPlaceItem / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_rSprite", undefined);
  setMeProp(_me, "m_rGrid", callNamed("createObject", callNamed("getUniqueID"), "CQuestPlaceItemGrid"));
  setMeProp(_me, "m_ar_components", new LingoPropList([]));
  setMeProp(_me, "m_ar_data", new LingoPropList([]));
  callMethod("sort", meProp(_me, "m_ar_components"))
  setMeProp(_me, "m_rWindow", undefined);
  return 1;
}

