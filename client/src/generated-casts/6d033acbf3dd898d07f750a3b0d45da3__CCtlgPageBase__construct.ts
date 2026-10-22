// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCtlgPageBase / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_bReady", 0);
  setMeProp(_me, "m_bVisible", 0);
  setMeProp(_me, "m_rWindow", undefined);
  setMeProp(_me, "m_kCurPage", symbol("closed"));
  setMeProp(_me, "m_rCurPageObj", undefined);
  setMeProp(_me, "m_mpItemList", undefined);
  setMeProp(_me, "m_sType", undefined);
  setMeProp(_me, "m_mpRoomData", undefined);
  setMeProp(_me, "m_mp_RoomDataList", undefined);
  setMeProp(_me, "m_iCurPageName", symbol("none"));
  setMeProp(_me, "m_mp_CatalogData", new LingoPropList([]));
  setMeProp(_me, "m_mp_rPageObjects", new LingoPropList([]));
  return 1;
}

