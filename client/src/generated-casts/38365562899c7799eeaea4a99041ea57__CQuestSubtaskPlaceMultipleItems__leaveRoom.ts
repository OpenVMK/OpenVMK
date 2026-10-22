// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskPlaceMultipleItems / leaveRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function leaveRoom(_me: LingoMe) {
  setMeProp(_me, "m_iLeaveRoomCount", lingoBinary("add", meProp(_me, "m_iLeaveRoomCount"), 1));
  if (lingoBinary("gt", meProp(_me, "m_iLeaveRoomCount"), 1)) {
  callMethod("ClearAll", _me)
  }

}

