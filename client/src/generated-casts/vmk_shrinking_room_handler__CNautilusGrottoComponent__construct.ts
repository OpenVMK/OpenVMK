// vmk_shrinking_room_handler.cct (Disney's file, archived as vmk_grotto_handler.cct) / CNautilusGrottoComponent / construct

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
  callNamed("registerMessage", symbol("room_animations_ready"), callMethod("getID", _me), symbol("Init"))
  callNamed("registerMessage", symbol("room_leave"), callMethod("getID", _me), symbol("Release"))
  return 1;
}

