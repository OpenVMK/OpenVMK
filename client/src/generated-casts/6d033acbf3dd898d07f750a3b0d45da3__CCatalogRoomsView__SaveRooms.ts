// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogRoomsView / SaveRooms

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SaveRooms(_me: LingoMe, _this: LingoValue, a_mpRoomList: LingoValue) {
  if (callNamed("listp", a_mpRoomList)) {
  setMeProp(_me, "m_mpRooms", a_mpRoomList);
  setMeProp(_me, "m_iRoomsCount", meProp(_me, "m_mpRooms")[1].count);
  callMethod("_ChangeNum", _this, 1)
  }

}

