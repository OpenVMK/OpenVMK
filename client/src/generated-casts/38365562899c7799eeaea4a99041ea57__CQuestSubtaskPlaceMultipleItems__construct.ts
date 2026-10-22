// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskPlaceMultipleItems / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_ar_defaults", new LingoPropList([symbol("min"), 1, symbol("max"), 1, symbol("accuracy"), 1, symbol("default"), 1]));
  setMeProp(_me, "m_iCurrentScore", 1);
  meProp(_me, "m_ar_defaults")[symbol("accuracy")] = 1;
  setMeProp(_me, "m_iScoreState", symbol("inactive"));
  setMeProp(_me, "m_iMaxLimit", 15);
  setMeProp(_me, "m_rSprite", undefined);
  setMeProp(_me, "m_ar_items", new LingoList([]));
  setMeProp(_me, "m_ar_data", new LingoPropList([]));
  setMeProp(_me, "m_rGrid", callNamed("createObject", callNamed("getUniqueID"), "CQuestPlaceItemGrid"));
  callNamed("registerMessage", symbol("room_leave"), callMethod("getID", _me), symbol("leaveRoom"))
  setMeProp(_me, "m_iLeaveRoomCount", 0);
  setMeProp(_me, "m_ar_components", new LingoPropList([]));
  callMethod("sort", meProp(_me, "m_ar_components"))
  setMeProp(_me, "m_rWindow", undefined);
  return 1;
}

