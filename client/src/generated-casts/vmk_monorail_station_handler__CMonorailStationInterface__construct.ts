// vmk_monorail_station_handler.cct / CMonorailStationInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  callNamed("registerMessage", symbol("MonorailStatus"), callMethod("getID", _me), symbol("MonorailInit"))
  callNamed("registerMessage", symbol("room_ready"), callMethod("getID", _me), symbol("LoadAnim"))
  callNamed("registerMessage", symbol("room_leave"), callMethod("getID", _me), symbol("UnloadAnim"))
  callNamed("registerMessage", symbol("animation_ready"), callMethod("getID", _me), symbol("animationReady"))
  setMeProp(_me, "m_pExits", new LingoList([]));
  setMeProp(_me, "m_pTileExits", new LingoList([]));
  setMeProp(_me, "m_animIDs", new LingoList([]));
  setMeProp(_me, "m_pTextScroller", 0);
  setMeProp(_me, "m_pTextScrollerHolder", 0);
  setMeProp(_me, "m_bMonorailReady", 0);
  setMeProp(_me, "m_iLastMsgReceived", lingoBinary("sub", theProperty("milliSeconds"), 10000));
  return 1;
}

