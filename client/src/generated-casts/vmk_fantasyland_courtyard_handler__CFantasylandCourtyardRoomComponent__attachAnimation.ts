// vmk_fantasyland_courtyard_handler.cct / CFantasylandCourtyardRoomComponent / attachAnimation

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function attachAnimation(_me: LingoMe) {
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  var t_rAnimationManager = callNamed("getObject", "AnimationManager");
  var tNode = callMethod("Search", tRoomContext, "NAME", meProp(_me, "m_sAnimName"));
  var tWorldPos = callMethod("GetAbsPos", callMethod("getObject", tNode));
  callMethod("NewAnimation", t_rAnimationManager, tWorldPos, meProp(_me, "m_sAnimName"), "flc_sword.ani")
  setMeProp(_me, "m_bReady", 1);
}

