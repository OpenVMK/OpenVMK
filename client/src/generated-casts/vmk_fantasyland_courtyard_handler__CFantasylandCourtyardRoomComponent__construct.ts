// vmk_fantasyland_courtyard_handler.cct / CFantasylandCourtyardRoomComponent / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_sAnimName", "vmk_anim_sword");
  callNamed("registerMessage", symbol("room_ready"), callMethod("getID", _me), symbol("attachAnimation"))
  return 1;
}

