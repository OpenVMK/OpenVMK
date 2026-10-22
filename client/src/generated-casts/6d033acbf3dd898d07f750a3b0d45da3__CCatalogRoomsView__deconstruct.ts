// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogRoomsView / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_rWndObj", undefined);
  setMeProp(_me, "m_rRoomNameField", undefined);
  setMeProp(_me, "m_rRoomDescField", undefined);
  setMeProp(_me, "m_bRoomDescOK", undefined);
  setMeProp(_me, "m_bRoomNAmeOK", undefined);
  setMeProp(_me, "m_iMyRoomID", undefined);
  setMeProp(_me, "m_rDialogWindow", undefined);
  setMeProp(_me, "m_bEnoughCredits", undefined);
  return 1;
}

