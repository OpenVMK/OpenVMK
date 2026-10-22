// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogInterface / _SaveRoomList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _SaveRoomList(_me: LingoMe, _this: LingoValue, a_mpRoomList: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rCurPageObj"))) {
  callMethod("SaveRoomList", meProp(_me, "m_rCurPageObj"), a_mpRoomList)
  }

}

