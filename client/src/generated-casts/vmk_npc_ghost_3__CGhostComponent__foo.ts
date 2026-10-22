// vmk_npc_ghost_3.cct / CGhostComponent / foo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function foo(_me: LingoMe, i_age: LingoValue) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "Foo", i_age), _me))
  if (callNamed("threadExists", symbol("animation"))) {
  var tAnimEngine = callMethod("getComponent", callNamed("getThread", symbol("animation")));
  callMethod("stopAnimations", _me, tAnimEngine)
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  var tNode = callMethod("Search", tRoomContext, "NAME", "ghost");
  if (lingoBinary("neq", tNode, 0)) {
  setThePropOf(callMethod("getSprite", callMethod("GetVisual", tNode)), "member", callNamed("getMember", "ghost_blank"));
  }

  }

}

