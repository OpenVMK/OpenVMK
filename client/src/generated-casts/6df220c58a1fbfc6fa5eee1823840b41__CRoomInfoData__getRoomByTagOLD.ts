// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoData / getRoomByTagOLD

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getRoomByTagOLD(_me: LingoMe, roomTag: LingoValue) {
  var t_pInfo = new LingoPropList([symbol("name"), "", symbol("description"), ""]);
  var t_data = callMethod("getaProp", meProp(_me, "m_pRooms"), callNamed("string", roomTag));
  if ((lingoTruthy(callNamed("voidp", t_data)) ? 0 : 1)) {
  setThePropOf(t_pInfo, "name", callMethod("getaProp", t_data, symbol("name")));
  setThePropOf(t_pInfo, "description", callMethod("getaProp", t_data, symbol("desc")));
  }

  return t_pInfo;
}

