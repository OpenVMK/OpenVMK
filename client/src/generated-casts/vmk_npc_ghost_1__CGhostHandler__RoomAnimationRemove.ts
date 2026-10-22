// vmk_npc_ghost_1.cct / CGhostHandler / RoomAnimationRemove

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RoomAnimationRemove(_me: LingoMe, tMsg: LingoValue) {
  var t_iAnimationsCount = callMethod("GetIntFrom", tMsg.connection);
  var t_ar_animations = new LingoList([]);
  for (var i = 1; i <= t_iAnimationsCount; ++i) {
  var t_animation = new LingoPropList([]);
  t_animation[symbol("ref")] = callMethod("GetIntFrom", tMsg.connection);
  callMethod("append", t_ar_animations, t_animation)
  }

  callNamed("put", lingoBinary("joinPad", "RoomAnimationRemove", t_ar_animations))
  callMethod("foo", callMethod("getComponent", _me))
}

