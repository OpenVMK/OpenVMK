// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogRoomsView / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue, a_mpCatalogData: LingoValue, a_kAlteredCategory: LingoValue) {
  setMeProp(_me, "m_mpCatalogData", a_mpCatalogData);
  var t_sName = callNamed("getText", "cat.name.10");
  switch (a_kAlteredCategory) {
case "balance":
  callMethod("UpdateBalance", _this)
  break;
case "roomId":
  setMeProp(_me, "m_iMyRoomID", a_mpCatalogData["roomId"].id);
  callMethod("CreateRoomCreatedWindow", _this, meProp(_me, "m_iMyRoomID"))
  break;
case undefined:
  callMethod("UpdateBalance", _this)
  break;
  }

}

