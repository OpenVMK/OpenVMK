// vmk_spacemountain_rocketride.cct / CSpaceMountainRocketRideComponent / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_bReady", 0);
  setMeProp(_me, "m_ar_hiddenAvatars", new LingoList([]));
  callNamed("registerMessage", symbol("room_animations_ready"), callMethod("getID", _me), symbol("Init"))
  callNamed("registerMessage", symbol("room_leave"), callMethod("getID", _me), symbol("Release"))
  return 1;
}

