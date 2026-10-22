// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoComponent / GetRoomOwner

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetRoomOwner(_me: LingoMe, _this: LingoValue, a_ar_sOwnerName: LingoValue) {
  var t_rContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  if ((lingoTruthy(callNamed("voidp", t_rContext)) ? 0 : 1)) {
  if ((lingoTruthy(callNamed("stringp", meProp(_me, "m_sRoomOwner"))) ? 0 : 1)) {
  setMeProp(_me, "m_sRoomOwner", "");
  }

  callMethod("add", a_ar_sOwnerName, meProp(_me, "m_sRoomOwner"))
  }

}

