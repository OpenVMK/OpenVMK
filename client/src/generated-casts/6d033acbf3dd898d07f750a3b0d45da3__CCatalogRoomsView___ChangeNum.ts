// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogRoomsView / _ChangeNum

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ChangeNum(_me: LingoMe, _this: LingoValue, a_iDir: LingoValue) {
  setMeProp(_me, "m_iRoomNum", lingoBinary("add", meProp(_me, "m_iRoomNum"), a_iDir));
  if (lingoBinary("gt", meProp(_me, "m_iRoomNum"), meProp(_me, "m_iRoomsCount"))) {
  setMeProp(_me, "m_iRoomNum", 1);
  }

  if (lingoBinary("lt", meProp(_me, "m_iRoomNum"), 1)) {
  setMeProp(_me, "m_iRoomNum", meProp(_me, "m_iRoomsCount"));
  }

  callMethod("ShowRooms", _this)
}

